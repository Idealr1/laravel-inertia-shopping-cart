<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class OrderAdminController extends Controller
{
    private function authorizeAdmin(): void
    {
        abort_unless(auth()->user()?->is_admin, 403);
    }

    public function index()
    {
        $this->authorizeAdmin();
        $orders = Order::with(['user:id,name,email', 'items.product:id,name'])
            ->orderByDesc('created_at')
            ->limit(200)
            ->get()
            ->map(function (Order $o) {
                return [
                    'id' => $o->id,
                    'user' => ['name' => $o->user->name, 'email' => $o->user->email],
                    'total' => (string) $o->total,
                    'status' => $o->status,
                    'created_at' => $o->created_at->toDateTimeString(),
                    'lines' => $o->items->map(fn ($i) => [
                        'product' => $i->product->name,
                        'quantity' => $i->quantity,
                        'unit_price' => (string) $i->unit_price,
                    ]),
                ];
            });

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }
}


