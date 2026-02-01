<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware("auth:sanctum")->get('/', function () {
    return view('dashboard', [
        "pageTitle" => "Home"
    ]);
})->name("dashboard");

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');

Route::get('/login', [AuthController::class, 'showLogin'])->name("login");
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
