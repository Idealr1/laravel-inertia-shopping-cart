<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailySalesReport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param array<int, array{name: string, quantity: int, revenue: string}> $lines
     * @param string $totalRevenue
     */
    public function __construct(
        public readonly array $lines,
        public readonly string $totalRevenue,
        public readonly \DateTimeInterface $date
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Report - ' . $this->date->format('Y-m-d'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.daily_sales_report',
            with: [
                'lines' => $this->lines,
                'totalRevenue' => $this->totalRevenue,
                'date' => $this->date,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
