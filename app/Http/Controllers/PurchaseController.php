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

        $purchases = Purchase::where('user_id', $user->id)
            ->latest()
            ->get();
        $cars = [];

        foreach ($purchases as $purchase) {
            foreach ($purchase->items as $item) {
                $cars[] = [
                    'purchase_id' => $purchase->id,
                    'purchased_at' => $purchase->created_at,
                    'id' => $item['id'],
                    'brand' => $item['brand'] ?? null,
                    'line' => $item['line'] ?? null,
                    'model' => $item['model'] ?? null,
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['subtotal'],
                    'photos' => $item['photos'] ?? [],
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
        $items = [];
        $total = 0;

        DB::beginTransaction();

        try {
            foreach ($request->cart['items'] as $item) {
                $car = Car::lockForUpdate()->find($item['id']);

                $price = $car->price;
                $subtotal = $price * $item['amount'];
                $total += $subtotal;

                $items[] = [
                    'id' => $car->id,
                    'brand' => $car->brand,
                    'line' => $car->line,
                    'model' => $car->model,
                    'price' => $price,
                    'quantity' => $item['amount'],
                    'subtotal' => $subtotal,
                    'photos' => $car->photos ?? [],
                ];
            }

            $purchase = Purchase::create([
                'user_id' => $user->id,
                'items' => $items,
                'total' => $total,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Purchase created successfully',
                'purchase' => $purchase,
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
