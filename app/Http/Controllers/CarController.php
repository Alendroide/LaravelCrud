<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    public function index()
    {
        return Car::orderBy('id', 'desc')->paginate(12);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'brand' => 'required|string',
            'line' => 'required|string',
            'model' => 'required|string',
            'color' => 'required|string',
            'plate' => 'required|string|unique:cars,plate',
        ]);

        return Car::create($data);
    }

    public function show(Car $car)
    {
        return $car;
    }

    public function update(Request $request, Car $car)
    {
        $data = $request->validate([
            'brand' => 'required|string',
            'line' => 'required|string',
            'model' => 'required|string',
            'color' => 'required|string',
            'plate' => 'required|string|unique:cars,plate,' . $car->id,
        ]);

        $car->update($data);

        return $car;
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return response()->noContent();
    }
}
