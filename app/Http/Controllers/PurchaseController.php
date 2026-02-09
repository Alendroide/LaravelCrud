<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Purchase;
use DB;

class PurchaseController extends Controller
{

    public function myCars(Request $request)
    {
        $user = $request->user();

        $purchases = Purchase::with('cars')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $cars = [];

        foreach ($purchases as $purchase) {
            foreach ($purchase->cars as $car) {
                $amount = $car->pivot->amount;
                $subtotal = $car->price * $amount;

                $cars[] = [
                    'purchase_id' => $purchase->id,
                    'purchased_at' => $purchase->created_at,

                    'id' => $car->id,
                    'brand' => $car->brand,
                    'line' => $car->line,
                    'model' => $car->model,
                    'price' => $car->price,

                    'quantity' => $amount,
                    'subtotal' => $subtotal,

                    'photos' => $car->photos ?? [],
                ];
            }
        }

        return response()->json($cars);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cart.items' => 'required|array|min:1',
            'cart.items.*.id' => 'required|integer|exists:cars,id',
            'cart.items.*.amount' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        $total = 0;

        DB::beginTransaction();

        try {
            foreach ($request->cart['items'] as $item) {
                $car = Car::lockForUpdate()->findOrFail($item['id']);
                $total += $car->price * $item['amount'];
            }

            $purchase = Purchase::create([
                'user_id' => $user->id,
                'total' => $total,
            ]);

            foreach ($request->cart['items'] as $item) {
                $purchase->cars()->attach($item['id'], [
                    'amount' => $item['amount'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Purchase created successfully',
                'purchase_id' => $purchase->id,
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
