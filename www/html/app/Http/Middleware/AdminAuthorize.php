<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthorize
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        // if(false){
        if (!Auth::check()) {
            return redirect(RouteServiceProvider::HOME);
        }
        if (Auth::user()->isAdmin == 1) {
            return $next($request);
        }else{
            return redirect(RouteServiceProvider::HOME);
        }

        return $next($request);
        // return redirect(RouteServiceProvider::HOME);
        return $request->expectsJson() ? null : route('login');
    }
}
