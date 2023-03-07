<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Termwind\Components\Dd;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $token = Auth::user()->createToken('apiToken')->plainTextToken;

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME)->withCookie(cookie('apiToken', $token, 60*2, null, null, false, false));
    }

    public function apiLogin(LoginRequest $request)
    {
        if(!Auth::attempt($request->only(['email','password']))){
        return response(["msg"=>"Bad Credential"]);
    }
    $token =  Auth::user()->createToken($request->get('email'))->plainTextToken;
    $cookie = cookie('token',$token,60*24); // 用 cookie 带到客户端
    return response(['token'=>$token])->withCookie($cookie); 
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->user()->tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
