<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use App\Jobs\NotifyLowStockJob;

class CheckoutController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        DB::transaction(function () use ($user, $cart) {
            $order = Order::create([
                'user_id' => $user->id,
                'total' => 0,
                'status' => 'paid',
            ]);

            $total = 0;

            foreach ($cart->items as $item) {
                $product = Product::lockForUpdate()->find($item->product_id);
                if (!$product || $product->stock_quantity < $item->quantity) {
                    throw new \RuntimeException('Insufficient stock for ' . ($product?->name ?? 'product'));
                }

                $product->stock_quantity -= $item->quantity;
                $product->save();

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                ]);

                $total += $item->quantity * (float) $item->unit_price;

                if ($product->stock_quantity <= $product->low_stock_threshold) {
                    NotifyLowStockJob::dispatch($product->id);
                }
            }

            $order->update(['total' => number_format($total, 2, '.', '')]);

            $cart->items()->delete();
        });

        return redirect()->route('orders.thankyou')->with('success', 'Order placed successfully.');
    }
}
