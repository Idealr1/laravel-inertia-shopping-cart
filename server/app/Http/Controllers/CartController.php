<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function index()
    {
        $cart = $this->getOrCreateCart();
        $cart->load(['items.product:id,name,price,stock_quantity']);

        return Inertia::render('Cart/Index', [
            'cart' => [
                'id' => $cart->id,
                'total' => $cart->total,
                'items' => $cart->items->map(fn (CartItem $item) => [
                    'id' => $item->id,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => (string) $item->product->price,
                        'stock_quantity' => $item->product->stock_quantity,
                    ],
                    'quantity' => $item->quantity,
                    'unit_price' => (string) $item->unit_price,
                    'line_total' => number_format($item->quantity * (float) $item->unit_price, 2, '.', ''),
                ]),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($data['product_id']);

        if ($product->stock_quantity < $data['quantity']) {
            throw ValidationException::withMessages([
                'quantity' => 'Insufficient stock.',
            ]);
        }

        $cart = $this->getOrCreateCart();

        DB::transaction(function () use ($cart, $product, $data) {
            $item = $cart->items()->where('product_id', $product->id)->lockForUpdate()->first();
            if ($item) {
                $item->quantity += $data['quantity'];
                $item->save();
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $data['quantity'],
                    'unit_price' => $product->price,
                ]);
            }
        });

        return redirect()->back()->with('success', 'Added to cart.');
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $this->authorizeCartItem($cartItem);

        if ($cartItem->product->stock_quantity < $data['quantity']) {
            throw ValidationException::withMessages([
                'quantity' => 'Insufficient stock.',
            ]);
        }

        $cartItem->update(['quantity' => $data['quantity']]);

        return redirect()->back()->with('success', 'Cart updated.');
    }

    public function destroy(CartItem $cartItem): RedirectResponse
    {
        $this->authorizeCartItem($cartItem);
        $cartItem->delete();
        return redirect()->back()->with('success', 'Item removed.');
    }

    private function getOrCreateCart(): Cart
    {
        $user = auth()->user();
        return Cart::firstOrCreate(['user_id' => $user->id]);
    }

    private function authorizeCartItem(CartItem $cartItem): void
    {
        $user = auth()->user();
        if ($cartItem->cart->user_id !== $user->id) {
            abort(403);
        }
    }
}
