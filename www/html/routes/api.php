<?php

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    Route::apiResource('room', RoomController::class);
});
Route::post('apiLogin', [AuthenticatedSessionController::class, 'apiLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('room', RoomController::class);
    Route::post('room/search', [RoomController::class, 'search'])->name('room.searchList');
    Route::post('getBestMatch', [RoomController::class, 'getBestMatch'])->name('room.getBestMatch');
    Route::apiResource('record', RecordController::class);

    Route::get('getActiveRecords', [RecordController::class, 'getActiveRecords'])->name('record.getActiveRecords');
    Route::get('getPastRecords', [RecordController::class, 'getPastRecords'])->name('record.getPastRecords');
    Route::get('getWaitList', [RecordController::class, 'getWaitList'])->name('record.getWaitList');
});