<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\DailySalesReport;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class SendDailySalesReportJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
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

            $adminEmail = config('mail.admin_email', env('ADMIN_EMAIL', 'admin@example.com'));
            Mail::to($adminEmail)->send(new DailySalesReport($lines, $totalRevenue, now()));
    }
}
