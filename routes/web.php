<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;

Route::middleware("auth")->get('/', function () {
    return view('dashboard', [
        "pageTitle" => "Inicio"
    ]);
})->name("dashboard");

Route::middleware("auth")->get('/my-vehicles', function () {
    return view('my-vehicles', [
        "pageTitle" => "Mis vehículos"
    ]);
})->name("my-vehicles");

Route::middleware("auth")->get('/my-archives', function () {
    return view('my-archives', [
        "pageTitle" => "Mis archivos"
    ]);
})->name("my-archives");

Route::middleware("auth")->get("/car/{id}", function() {
    return view('vehicle', [
        "pageTitle" => "Vehículo"
    ]);
})->name("vehicle.show");

// AUTH

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');
Route::get('/login', [AuthController::class, 'showLogin'])->name("login");
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

// API

Route::middleware('auth')->get('/get-user-vehicles', [CarController::class, 'myVehicles']);
Route::middleware('auth')->get('/get-archive-vehicles', [CarController::class, 'myArchives']);
Route::middleware('auth')->get('/cars/export', [CarController::class, 'exportExcel']);
Route::middleware('auth')->resource('/cars', CarController::class);