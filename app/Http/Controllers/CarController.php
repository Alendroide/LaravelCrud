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
            'photos'   => 'nullable|array|max:7',
            'photos.*' => 'image|max:2048',
        ]);

        $photoPaths = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('cars', 'public');
                $photoPaths[] = $path;
            }
        }

        $car = Car::create([
            'brand'    => $data['brand'],
            'line'     => $data['line'],
            'model'    => $data['model'],
            'color'    => $data['color'],
            'plate'    => $data['plate'],
            'photos'   => $photoPaths,
            'owner_id' => auth()->id(),
        ]);

        return response()->json($car);
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
            'photos' => 'nullable|array|max:7',
            'photos.*' => 'image|max:2048',
            'deleted_photos' => 'nullable|array',
            'deleted_photos.*' => 'string',
        ]);

        $currentPhotos = $car->photos ?? [];

        if (!empty($data['deleted_photos'])) {
            foreach ($data['deleted_photos'] as $photo) {
                Storage::disk('public')->delete($photo);
            }

            $currentPhotos = array_values(
                array_diff($currentPhotos, $data['deleted_photos'])
            );
        }

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('cars', 'public');
                $currentPhotos[] = $path;
            }
        }

        $car->update([
            'brand'  => $data['brand'],
            'line'   => $data['line'],
            'model'  => $data['model'],
            'color'  => $data['color'],
            'plate'  => $data['plate'],
            'photos' => $currentPhotos,
        ]);

        return response()->json($car);
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return response()->noContent();
    }
}
