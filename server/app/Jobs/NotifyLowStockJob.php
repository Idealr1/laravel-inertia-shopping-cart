<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\LowStockAlert;
use App\Models\Product;

class NotifyLowStockJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly int $productId)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $product = Product::find($this->productId);
        if (!$product) {
            return;
        }

        $adminEmail = config('mail.admin_email', env('ADMIN_EMAIL', 'admin@example.com'));
        Mail::to($adminEmail)->send(new LowStockAlert($product));
    }
}
