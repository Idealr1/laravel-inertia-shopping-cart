import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Index({ products }) {
    const { auth, flash } = usePage().props;
    const [qtyById, setQtyById] = useState({});
    const [loadingId, setLoadingId] = useState(null);
    const { processing } = useForm({});

    const addToCart = (productId) => {
        if (!auth?.user) {
            window.location.href = route('login');
            return;
        }
        const quantity = Number(qtyById[productId] ?? 1);
        setLoadingId(productId);
        router.post(
            route('cart.store'),
            { product_id: productId, quantity },
            {
                preserveScroll: true,
                onFinish: () => setLoadingId(null),
            },
        );
    };

    const content = (
        <div className="max-w-7xl mx-auto p-6">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-indigo-600 text-white grid place-items-center font-bold">SC</div>
                    <h1 className="text-2xl font-semibold">ShopCart</h1>
                </div>
                {auth?.user ? (
                    <div className="flex items-center gap-4">
                        <Link href={route('cart.index')} className="relative inline-flex items-center text-gray-700 hover:text-gray-900">
                            <span className="me-2">Cart</span>
                            <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white">
                                {auth.cartCount ?? 0}
                            </span>
                        </Link>
                        <Link href={route('dashboard')} className="text-gray-600 hover:text-gray-900">
                            Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href={route('login')} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sign in
                        </Link>
                        <Link href={route('register')} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                            Sign up
                        </Link>
                    </div>
                )}
            </div>

            {/* Hero */}
            {!auth?.user && (
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white shadow">
                    <h2 className="text-2xl font-semibold">Modern gear for your workspace</h2>
                    <p className="mt-1 text-indigo-100">Create an account to save your cart and checkout faster.</p>
                    <div className="mt-4 flex gap-3">
                        <Link href={route('register')} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
                            Create account
                        </Link>
                        <Link href={route('login')} className="rounded-md border border-white/50 px-4 py-2 text-sm font-medium hover:bg-white/10">
                            Sign in
                        </Link>
                    </div>
                </div>
            )}

            {flash?.success && (
                <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="border rounded-xl p-5 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{p.name}</h2>
                            <p className="mt-1 text-gray-700">${Number(p.price).toFixed(2)}</p>
                            <p className="mt-1 text-sm text-gray-500">
                                Stock: <span className={p.stock_quantity <= 5 ? 'text-red-600' : ''}>{p.stock_quantity}</span>
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                className="w-24 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={qtyById[p.id] ?? 1}
                                onChange={(e) =>
                                    setQtyById((m) => ({
                                        ...m,
                                        [p.id]: Number(e.target.value),
                                    }))
                                }
                            />
                            <PrimaryButton
                                disabled={processing || loadingId === p.id || p.stock_quantity === 0}
                                onClick={() => addToCart(p.id)}
                            >
                                Add to Cart
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Head title="Products" />
            {auth?.user ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="text-xl font-semibold leading-tight">Products</h2>}
                >
                    <div className="py-6">{content}</div>
                </AuthenticatedLayout>
            ) : (
                <div className="min-h-screen bg-gray-100">{content}</div>
            )}
        </>
    );
}


