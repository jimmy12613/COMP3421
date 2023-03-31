<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Termwind\Components\Dd;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $record = DB::table('records')->get();
        return response($record, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        // $records = DB::table('records')->where([['roomId', '=', $request->roomId]])->get();

        // id will auto generate
        // $id = DB::select('select MAX(id) as id from records');
        // $id = $id[0]->id + 1;

        $userId = $request->userId;
        $roomId = $request->roomId;
        $timeFrom = $request->timeFrom;
        $timeTo = $request->timeTo;

        $conflictingRecords = DB::select(
            'SELECT * FROM records WHERE roomId = :roomId AND status >= 0 AND 
                ((timeFrom >= :timeFrom1 AND timeFrom <= :timeTo1) OR 
                (timeTo >= :timeFrom2 AND timeTo <= :timeTo2) OR 
                (timeFrom <= :timeFrom3 AND timeTo >= :timeTo3)) 
            ORDER BY created_at',
            [
                'roomId' => $roomId,
                'timeFrom1' => $timeFrom,
                'timeTo1' => $timeTo,
                'timeFrom2' => $timeFrom,
                'timeTo2' => $timeTo,
                'timeFrom3' => $timeFrom,
                'timeTo3' => $timeTo,
            ]
        );

        try {

            $status = 0;
            foreach ($conflictingRecords as $record) {
                DB::update(
                    'UPDATE records SET status = ? WHERE id = ?',
                    [$status, $record->id
                    ]
                );
                $status++;
            }

            DB::insert(
                'INSERT INTO records (userId, roomId, timeFrom, timeTo, status) VALUES (?, ?, ?, ?, ?)',
                [$userId, $roomId, $timeFrom, $timeTo, $status]
            );

            $newBooking = DB::select(
                'SELECT * FROM records WHERE userId = :userId AND roomId = :roomId AND status = :status AND timeFrom = :timeFrom AND timeTo = :timeTo',
                [
                    'userId' => $userId,
                    'roomId' => $roomId,
                    'status' => $status,
                    'timeFrom' => $timeFrom,
                    'timeTo' => $timeTo,
                ]
            );
            return response([ 'success' => $newBooking[0]->id], Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            // dd($e->errorInfo);
            $errorCode = $e->errorInfo[1];
            $errorMessage = $e->errorInfo[2];
            return response([ 'error' => $errorMessage], Response::HTTP_CONFLICT);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record): Response
    {
        $record = Record::findOrFail($record->id);
        return response($record, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Record $record): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record): Response
    {
        try {
            $record->update($request->all());
            return response($record, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response([ 'error' => 'Something went wrong'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record): Response
    {
        $record->delete();
        $conflictRecord = null;

        $acceptedRecords = DB::select('select * from records where roomId = :roomId and status = 0', ['roomId' => $record->roomId]);
        $WaitlistRecords = DB::select('select * from records where roomId = :roomId and status > 0 order by created_at', ['roomId' => $record->roomId]);
        
        if ($record->status !=0) {
            foreach ($acceptedRecords as $x) {
                if ($this->checkConflictTime($record, $x)) {
                    $conflictRecord = $x;
                    foreach ($WaitlistRecords as $w) {
                        if ($this->checkConflictTime($w, $conflictRecord) && $w->status > $record->status) {
                            $affected = DB::update('update records set status = ?, updated_at = NOW() where id = ?', [(($w->status)-1), $w->id]);
                        }
                    }
                }
            }
        } else {
            $acceptedRecords = DB::select('select * from records where roomId = :roomId and status = 0', ['roomId' => $record->roomId]);
            $conflicted = false;
            $allocated = false;
            foreach ($WaitlistRecords as $x) {
                $conflicted = false;
                if ($this->checkConflictTime($x, $record)) {
                    if (!$allocated){
                        foreach ($acceptedRecords as $a) {
                            if ($this->checkConflictTime($x, $a)) {
                                $conflicted = true;
                                break;
                            } 
                        }
                        if (!$conflicted) {
                            $affected = DB::update('update records set status = ?, updated_at = NOW() where id = ?', [0, $x->id]);
                            $allocated = true;
                        }
                    } else {
                        $affected = DB::update('update records set status = ?, updated_at = NOW() where id = ?', [($x->status)-1, $x->id]);
                    }
                }
            }
        }

        return response([ 'success' => 'Record deleted'], Response::HTTP_OK);
    }

    public function getActiveRecords(): Response
    {
        $records = DB::table('records')->where([
            ['userId', '=', auth()->user()->userId],
            ['timeTo', '>', now()],
            ['status', '=', 0]
        ])->get();
        return response($records, Response::HTTP_OK);
    }

    public function getAllRecords(): Response
    {
        $records = DB::table('records')->where([
            ['userId', '=', auth()->user()->userId],
            ['status', '=', 0]
        ])->get();
        return response($records, Response::HTTP_OK);
    }

    public function getActiveWaitList(): Response
    {
        $records = DB::table('records')->where([
            ['userId', '=', auth()->user()->userId],
            ['timeTo', '>', now()],
            ['status', '>', 0]
        ])->get();
        return response($records, Response::HTTP_OK);
    }

    public function getAllWaitList(): Response
    {
        $records = DB::table('records')->where([
            ['userId', '=', auth()->user()->userId],
            ['status', '>', 0]
        ])->get();
        return response($records, Response::HTTP_OK);
    }

    private function checkConflictTime($new, $old): bool {
        return (($new->timeFrom >= $old->timeFrom) && ($new->timeFrom < $old->timeTo) || ($new->timeTo > $old->timeFrom) && ($new->timeTo <= $old->timeTo));
    }
}