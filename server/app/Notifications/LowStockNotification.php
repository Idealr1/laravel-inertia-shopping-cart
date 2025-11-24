<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LowStockNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Product $product)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'low_stock',
            'icon' => 'alert',
            'title' => 'Low stock: ' . $this->product->name,
            'body' => 'Stock is ' . $this->product->stock_quantity . ' (threshold ' . $this->product->low_stock_threshold . ')',
            'url' => route('admin.products.edit', $this->product),
        ];
    }
}


