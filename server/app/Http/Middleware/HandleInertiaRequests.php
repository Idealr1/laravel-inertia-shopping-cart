<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\CartItem;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'cartCount' => function () use ($request) {
                    $user = $request->user();
                    if (!$user) {
                        return 0;
                    }
                    $cart = $user->cart;
                    if (!$cart) {
                        return 0;
                    }
                    return (int) CartItem::where('cart_id', $cart->id)->sum('quantity');
                },
                'is_admin' => (bool) optional($request->user())->is_admin,
            ],
            'notifications' => function () use ($request) {
                $user = $request->user();
                if (!$user) {
                    return ['unread_count' => 0, 'items' => []];
                }
                $unread = $user->unreadNotifications()->latest()->limit(10)->get();
                return [
                    'unread_count' => $user->unreadNotifications()->count(),
                    'items' => $unread->map(fn ($n) => [
                        'id' => $n->id,
                        'icon' => $n->data['icon'] ?? 'bell',
                        'title' => $n->data['title'] ?? '',
                        'body' => $n->data['body'] ?? '',
                        'url' => $n->data['url'] ?? null,
                        'created_at' => optional($n->created_at)->diffForHumans(),
                    ]),
                ];
            },
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
