<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\LowStockAlert;
use App\Models\Product;
use App\Models\User;
use App\Notifications\LowStockNotification;

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

        // If stock is currently above threshold, do not notify (and clear any old flag).
        if ($product->stock_quantity > $product->low_stock_threshold) {
            if (!is_null($product->low_stock_notified_at)) {
                $product->forceFill(['low_stock_notified_at' => null])->saveQuietly();
            }
            return;
        }

        // Idempotency: if already notified and still low, skip.
        if (!is_null($product->low_stock_notified_at)) {
            return;
        }

        $adminEmail = config('mail.admin_email', env('ADMIN_EMAIL', 'admin@example.com'));
        Mail::to($adminEmail)->send(new LowStockAlert($product));

        // Mark as notified
        $product->forceFill(['low_stock_notified_at' => now()])->saveQuietly();

        // Also create database notifications for all admins
        User::where('is_admin', true)->get()->each(function ($admin) use ($product) {
            $admin->notify(new LowStockNotification($product));
        });
    }
}
