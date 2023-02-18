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
        // dd($room);
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
        return response([ 'success' => 'Room deleted'], Response::HTTP_OK);
    }
}
