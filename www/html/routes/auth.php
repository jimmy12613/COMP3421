<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// 第一middleware組適用於訪客（即未經身份驗證的用戶）並定義註冊、登錄和密碼重置的路由。
// 第二middleware組適用於經過身份驗證的用戶，定義了電子郵件驗證、密碼確認、密碼更新和註銷的路由。

// 對於guest：
// GET /register：顯示用於創建新用戶帳戶的註冊表單。
// POST /register：處理通過註冊表提交的數據並創建一個新的用戶帳戶。
// GET /login：顯示用於驗證用戶身份的登錄表單。
// POST /login：處理通過登錄表單提交的數據並驗證用戶。
// GET /forgot-password：顯示請求密碼重置鏈接的表單。
// POST /forgot-password：向用戶的電子郵件地址發送一封帶有密碼重置鏈接的電子郵件。
// GET /reset-password/{token}: 顯示重置密碼的表格。
// POST /reset-password：處理通過密碼重置表單提交的數據並更新密碼。

// 對於auth：
// GET /verify-email：向用戶顯示通知以驗證其電子郵件地址。
// GET /verify-email/{id}/{hash}：使用電子郵件驗證鏈接驗證用戶的電子郵件地址。
// POST /email/verification-notification：向用戶的電子郵件地址發送一封帶有電子郵件驗證鏈接的電子郵件。
// GET /confirm-password：顯示敏感操作前的密碼確認表單。
// POST /confirm-password：處理通過密碼確認表單提交的數據並確認用戶密碼。
// PUT /password：更新用戶密碼。
// POST /logout：註銷經過身份驗證的用戶。

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::middleware('auth','admin')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

############################################################################################################################
