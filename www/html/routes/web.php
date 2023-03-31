<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 這為 URL / 定義了一個 GET 路由
// 它返回一個名為Welcome視圖.
// 該視圖包含一個數據數組，其值為canLogin、canRegister、laravelVersion和phpVersion。
Route::get('/', function () {
    return Inertia::render('Auth/Register', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['guest']);

// 這為 URL /dashboard定義了一個 GET 路由，
// 它返回一個名為Dashboard的渲染視圖。
// 此路由僅供已驗證其電子郵件地址(verified)的經過身份驗證(auth)的用戶訪問。
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',['justTesting' => 'Hello World!']);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('admin')->group(function () {
    Route::get('/room', function () {
        return Inertia::render('Room/Search', [
            'roomDataSrc' => DB::table('rooms')->get(),
        ]);
    })->name('room.search');
    Route::get('/room/{id}', function () {
        try {
            return Inertia::render('Room/Detail', [
                'id' => request()->id,
                'roomDataSrc' => DB::table('rooms')->where('roomId', request()->id)->get(),
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('room.search');
        }
        
    })->name('room.detail');
});

// 這定義了一組僅供經過身份驗證的用戶訪問的路由/profile。
// 該組包括調用ProfileController edit方法的GET路由、
// 調用類方法ProfileController update的PATCH路由、
// 和調用類方法ProfileController delete的DELETE路由。
// 並為路由命名，用於生成按名稱重定向到路由，而不必每次都指定 URL。
// E.g. $url = route('profile.edit');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/booking', function () {
        return Inertia::render('Booking/Search', [
            'roomDataSrc' => DB::table('rooms')->get(),
        ]);
    })->name('booking.search');
});

require __DIR__.'/auth.php';
// require __DIR__.'/room.php';