<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Termwind\Components\Dd;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $room = DB::table('rooms')->get();
        return response($room, Response::HTTP_OK);
    }

    public function search(Request $request): Response
    {
        // dd($request->all());
        // search room by criteria
        $room = DB::table('rooms')->where([
            ['name', 'like', '%' . request('name') . '%'],
            ['capacity', '>=', request('capacity') ?: 0],
            ['num_computers', '>=', request('num_computers') ?: 0],
            ['num_projectors', '>=', request('num_projectors') ?: 0],
            ['num_microphones', '>=', request('num_microphones') ?: 0]
        ])->get();
        return response($room, Response::HTTP_OK);
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
        try {
            $room = Room::create($request->all());
            return response([ 'success' => $room->roomId], Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            // dd($e);
            $errorCode = $e->errorInfo[1];
            $errorMessage = $e->errorInfo[2];
            if ($errorCode == 1062 && str_contains($errorMessage,"Duplicate entry")) {
                if (str_contains($errorMessage,"location")) {
                    return response([ 'error' => 'Duplicate location'], Response::HTTP_CONFLICT);
                }
                if (str_contains($errorMessage,"name")) {
                    return response([ 'error' => 'Duplicate name'], Response::HTTP_CONFLICT);
                }
            }else return response([ 'error' => 'Something went wrong'], Response::HTTP_BAD_REQUEST);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room): Response
    {
        $room = Room::findOrFail($room->roomId);
        return response($room, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room): Response
    {
        try {
            $room->update($request->all());
            return response($room, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response([ 'error' => 'Something went wrong'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room): Response
    {
        DB::table('records')->where('roomId', $room->roomId)->delete();
        $result = $room->delete();
        return response([ "success" => $result?"Room deleted":"Error"], Response::HTTP_OK);
    }

    public function getBestMatch(): Response
    {
        $rooms = DB::table('rooms')->where([
            ['name', 'like', '%' . request('name') . '%'],
            ['capacity', '>=', request('capacity') ?: 0],
            ['num_computers', '>=', request('num_computers') ?: 0],
            ['num_projectors', '>=', request('num_projectors') ?: 0],
            ['num_microphones', '>=', request('num_microphones') ?: 0]
        ])->get();

        // if (empty($rooms)) {
        //     return response(Response::HTTP_NOT_FOUND);
        // }

        $bestMatchRoom = $rooms[0];
        $bestMatchScore = $rooms[0]->capacity +
            $rooms[0]->num_computers +
            $rooms[0]->num_projectors +
            $rooms[0]->num_microphones;

        foreach ($rooms as $room) {
            $score = $room->capacity +
                $room->num_computers +
                $room->num_projectors +
                $room->num_microphones;

            if ($score < $bestMatchScore) {
                $bestMatchScore = $score;
                $bestMatchRoom = $room;
            }
        }

        return response([$bestMatchRoom], Response::HTTP_OK);
    }
}
