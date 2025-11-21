import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Index({ products }) {
    const { auth, flash } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        product_id: null,
        quantity: 1,
    });

    const addToCart = (productId) => {
        if (!auth?.user) {
            window.location.href = route('login');
            return;
        }
        post(route('cart.store'), {
            data: { product_id: productId, quantity: data.quantity || 1 },
            onSuccess: () => reset('quantity'),
        });
    };

    const content = (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Products</h1>
                {auth?.user ? (
                    <Link href={route('cart.index')} className="text-indigo-600 hover:underline">
                        View Cart
                    </Link>
                ) : (
                    <Link href={route('login')} className="text-indigo-600 hover:underline">
                        Sign in
                    </Link>
                )}
            </div>
            {flash?.success && (
                <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-lg font-medium">{p.name}</h2>
                            <p className="mt-1 text-gray-600">${Number(p.price).toFixed(2)}</p>
                            <p className="mt-1 text-sm text-gray-500">
                                Stock: <span className={p.stock_quantity <= 5 ? 'text-red-600' : ''}>{p.stock_quantity}</span>
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                className="w-24 rounded border-gray-300"
                                value={data.quantity || 1}
                                onChange={(e) => setData('quantity', Number(e.target.value))}
                            />
                            <PrimaryButton disabled={processing} onClick={() => addToCart(p.id)}>
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


