<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function authorizeAdmin(): void
    {
        abort_unless(auth()->user()?->is_admin, 403);
    }

    public function index()
    {
        $this->authorizeAdmin();

        $todayStart = now()->startOfDay();
        $todayEnd = now()->endOfDay();

        $productsCount = Product::count();
        $lowStockCount = Product::whereColumn('stock_quantity', '<=', 'low_stock_threshold')->count();
        $ordersToday = Order::whereBetween('created_at', [$todayStart, $todayEnd])->count();
        $revenueToday = (float) OrderItem::join('orders', 'orders.id', '=', 'order_items.order_id')
            ->whereBetween('orders.created_at', [$todayStart, $todayEnd])
            ->sum(DB::raw('order_items.quantity * order_items.unit_price'));

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'products' => $productsCount,
                'lowStock' => $lowStockCount,
                'ordersToday' => $ordersToday,
                'revenueToday' => number_format($revenueToday, 2, '.', ''),
            ],
        ]);
    }
}


