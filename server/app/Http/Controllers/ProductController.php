<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('name')->get(['id', 'name', 'price', 'stock_quantity']);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }
}
