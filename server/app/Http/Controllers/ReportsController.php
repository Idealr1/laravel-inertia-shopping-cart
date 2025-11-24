<?php

namespace App\Http\Controllers;

use App\Jobs\SendDailySalesReportJob;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportsController extends Controller
{
    private function authorizeAdmin(): void
    {
        abort_unless(auth()->user()?->is_admin, 403);
    }

    public function daily(Request $request)
    {
        $this->authorizeAdmin();
        $today = now()->startOfDay();
        $tomorrow = now()->endOfDay();

        $sales = OrderItem::query()
            ->select([
                'products.name as name',
                DB::raw('SUM(order_items.quantity) as quantity'),
                DB::raw('SUM(order_items.quantity * order_items.unit_price) as revenue'),
            ])
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->whereBetween('orders.created_at', [$today, $tomorrow])
            ->groupBy('products.name')
            ->orderBy('products.name')
            ->get();

        $lines = $sales->map(fn ($row) => [
            'name' => $row->name,
            'quantity' => (int) $row->quantity,
            'revenue' => number_format((float) $row->revenue, 2, '.', ''),
        ])->all();

        $totalRevenue = number_format(
            (float) ($sales->sum('revenue')),
            2,
            '.',
            ''
        );

        return Inertia::render('Admin/Reports/DailySales', [
            'lines' => $lines,
            'totalRevenue' => $totalRevenue,
            'date' => now()->toDateString(),
        ]);
    }

    public function sendDaily(Request $request)
    {
        $this->authorizeAdmin();
        // Run synchronously so the admin sees the log email immediately without a worker.
        SendDailySalesReportJob::dispatchSync();
        return back()->with('success', 'Daily report queued.');
    }
}


