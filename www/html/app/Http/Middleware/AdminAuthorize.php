<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use Termwind\Components\Dd;

class AdminAuthorize
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        if (str_contains($request->path(), "email")|| str_contains($request->path(), "logout") || str_contains($request->path(), "password") ) {
            return $next($request);
        }
        if (!Auth::check()) {
            return redirect(RouteServiceProvider::HOME);
        }
        if (Auth::user()->isAdmin == 1) {
            return $next($request);
        }else{
            return redirect(RouteServiceProvider::HOME);
        }
        return $request->expectsJson() ? null : route('login');
    }
}
