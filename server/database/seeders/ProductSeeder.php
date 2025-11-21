<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Wireless Mouse', 'price' => 24.99, 'stock_quantity' => 50],
            ['name' => 'Mechanical Keyboard', 'price' => 89.99, 'stock_quantity' => 30],
            ['name' => 'USB-C Cable', 'price' => 9.99, 'stock_quantity' => 200],
            ['name' => '27\" Monitor', 'price' => 249.99, 'stock_quantity' => 12],
            ['name' => 'Laptop Stand', 'price' => 29.99, 'stock_quantity' => 40],
            ['name' => 'Noise Cancelling Headphones', 'price' => 199.99, 'stock_quantity' => 15],
            ['name' => 'Webcam 1080p', 'price' => 49.99, 'stock_quantity' => 25],
            ['name' => 'Portable SSD 1TB', 'price' => 119.99, 'stock_quantity' => 20],
            ['name' => 'Bluetooth Speaker', 'price' => 59.99, 'stock_quantity' => 35],
        ];

        foreach ($products as $p) {
            Product::firstOrCreate(['name' => $p['name']], [
                'price' => $p['price'],
                'stock_quantity' => $p['stock_quantity'],
                'low_stock_threshold' => 5,
            ]);
        }
    }
}
