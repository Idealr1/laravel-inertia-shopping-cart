<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LowStockAlert extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly \App\Models\Product $product)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Low Stock Alert: ' . $this->product->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.low_stock_alert',
            with: [
                'product' => $this->product,
                'url' => route('admin.products.edit', $this->product),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
