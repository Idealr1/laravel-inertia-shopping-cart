<?php

namespace App\Observers;

use App\Jobs\NotifyLowStockJob;
use App\Models\Product;

class ProductObserver
{
    public function saved(Product $product): void
    {
        // If product is at or below threshold and we haven't notified yet, queue a notification.
        if ($product->stock_quantity <= $product->low_stock_threshold) {
            if (is_null($product->low_stock_notified_at)) {
                NotifyLowStockJob::dispatch($product->id);
            }
            return;
        }

        // If restocked above threshold, clear the notified timestamp to enable future alerts.
        if (!is_null($product->low_stock_notified_at)) {
            $product->forceFill(['low_stock_notified_at' => null])->saveQuietly();
        }
    }
}


