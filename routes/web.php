<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ClientController;

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

Route::middleware("auth")->get("/cart", function() {
    return view('cart', [
        "pageTitle" => "Carrito de compras"
    ]);
})->name("cart");

Route::middleware("auth")->get("/mis-compras", function() {
    return view('bought-cars', [
        "pageTitle" => "Mis compras"
    ]);
})->name("bought-cars");

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
Route::middleware('auth')->post('/purchase', [PurchaseController::class, 'store'])->name('purchase.store');
Route::middleware('auth')->get('/my-purchases/cars', [PurchaseController::class, 'myCars'])->name('purchases.cars');
Route::middleware('auth')->get('/clients/{cc}', [ClientController::class, 'show'])->name('clients.show');