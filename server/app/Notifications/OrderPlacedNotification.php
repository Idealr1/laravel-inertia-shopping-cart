<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class OrderPlacedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Order $order)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'order_placed',
            'icon' => 'cart',
            'title' => 'New order #' . $this->order->id,
            'body' => 'Total $' . number_format((float) $this->order->total, 2),
            'url' => route('admin.orders.index'),
        ];
    }
}


