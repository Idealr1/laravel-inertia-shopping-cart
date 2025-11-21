<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function thankYou()
    {
        return Inertia::render('Orders/ThankYou');
    }
}
