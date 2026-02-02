<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->apiResource('/cars', CarController::class);
Route::middleware('auth:sanctum')->get('/my-vehicles', [CarController::class, 'myVehicles']);