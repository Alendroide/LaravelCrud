<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegister() {
        return view('auth.register',["pageTitle" => "Register"]);
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:40',
            'email' => 'required|email|unique:users|max:40',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return redirect('/');
    }

    public function showLogin() {
        return view('auth.login',["pageTitle" => "Log in"]);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()->withInput()->withErrors([
            'email' => 'Invalid credentials',
        ]);
    }
}
