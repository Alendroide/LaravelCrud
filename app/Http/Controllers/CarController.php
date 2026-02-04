<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $cars = Car::query()
            ->when($request->brand, function ($q) use ($request) {
                $q->where('brand', $request->brand);
            })
            ->when($request->line, function ($q) use ($request) {
                $q->where('line', $request->line);
            })
            ->when($request->color, function ($q) use ($request) {
                $q->where('color', $request->color);
            })
            ->when($request->model, function ($q) use ($request) {
                $q->where('model', $request->model);
            })
            ->when($request->min_price, function ($q) use ($request) {
                $q->where('price', '>=', $request->min_price);
            })
            ->when($request->max_price, function ($q) use ($request) {
                $q->where('price', '<=', $request->max_price);
            })
            ->orderBy('views', 'desc')
            ->paginate(12)
            ->withQueryString();

        return $cars;
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
            'price' => 'nullable|numeric',
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
            'price'    => $data['price'],
        ]);

        return response()->json($car);
    }

    public function show(Car $car)
    {
        $car->increment('views');
        return $car;
    }

    public function update(Request $request, Car $car)
    {
        $user = auth()->id();

        if ($car->owner_id !== $user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

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
            'price' => 'nullable|numeric',
        ]);

        $currentPhotos = $car->photos ?? [];

        if (!empty($data['deleted_photos'])) {
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
            'price'  => $data['price'],
        ]);

        return response()->json($car);
    }

    public function destroy(Car $car)
    {
        $car->status = ! $car->status;
        $car->save();
        return response()->json([ "message" => "status toggled successfully"]);
    }

    public function myVehicles() {
        return Car::where('owner_id', auth()->id())->orderBy('id', 'desc')->paginate(12);
    }
}
