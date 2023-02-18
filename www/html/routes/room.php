<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use Inertia\Inertia;

Route::middleware('admin')->group(function () {
    Route::get('/room', function () {
        return Inertia::render('Admin/Search');
    })->name('room.search');
    Route::get('/admin', [RoomController::class, 'index'])->name('admin.index');
    Route::get('/admin', [RoomController::class, 'create'])->name('admin.create');
    Route::get('/admin', [RoomController::class, 'show'])->name('admin.show');
    Route::post('/admin', [RoomController::class, 'store'])->name('admin.store');
    Route::get('/admin', [RoomController::class, 'edit'])->name('admin.edit');
    Route::patch('/admin', [RoomController::class, 'update'])->name('admin.update');
    Route::delete('/admin', [RoomController::class, 'destroy'])->name('admin.destroy');
});
