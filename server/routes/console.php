<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\SendDailySalesReportJob;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule the daily sales report every evening at 21:00
Schedule::job(new SendDailySalesReportJob())
    ->dailyAt('21:00')
    ->description('Send daily sales report to admin');
