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
        $records = DB::table('records')->get();
        foreach ($records as $x) {
            if ($x->roomId == $request->roomId) {
                if (($request->timeFrom >= $x->timeFrom) && ($request->timeFrom < $x->timeTo) || ($request->timeTo > $x->timeFrom) && ($request->timeTo <= $x->timeTo)) {
                    return response([ 'error' => 'Time Conflict'], Response::HTTP_CONFLICT);    //??
                }
            }
        }
        try {
            $record = Record::create($request->all());
            return response([ 'success' => $record->id], Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            // dd($e->errorInfo);
            $errorCode = $e->errorInfo[1];
            $errorMessage = $e->errorInfo[2];
            if (str_contains($errorMessage, "numOfPeople") && str_contains($errorMessage, "Out of range")) {
                return response(['error' => 'Number of people must larger than 0'], Response::HTTP_CONFLICT);
            }
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
}
