<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Admin\OrderAdminController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\AdminController;

Route::get('/', [ProductController::class, 'index'])->name('products.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart-items/{cartItem}', [CartController::class, 'update'])->name('cart.items.update');
    Route::delete('/cart-items/{cartItem}', [CartController::class, 'destroy'])->name('cart.items.destroy');

    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/orders/thank-you', [OrderController::class, 'thankYou'])->name('orders.thankyou');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead'])->name('notifications.markAllRead');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        Route::get('/products', [ProductAdminController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductAdminController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductAdminController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductAdminController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductAdminController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductAdminController::class, 'destroy'])->name('products.destroy');

        Route::get('/orders', [OrderAdminController::class, 'index'])->name('orders.index');

        Route::get('/reports/daily', [ReportsController::class, 'daily'])->name('reports.daily');
        Route::post('/reports/daily/send', [ReportsController::class, 'sendDaily'])->name('reports.daily.send');
    });
});

require __DIR__.'/auth.php';
