import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import SecondaryButton from '@/Components/SecondaryButton.jsx';

export default function Index({ cart }) {
    const { auth, flash, errors } = usePage().props;
    const { patch, delete: destroy, post, processing } = useForm({});

    const updateQuantity = (itemId, quantity) => {
        patch(route('cart.items.update', itemId), {
            data: { quantity },
            preserveScroll: true,
        });
    };

    const removeItem = (itemId) => {
        destroy(route('cart.items.destroy', itemId), { preserveScroll: true });
    };

    const checkout = () => {
        post(route('checkout.store'));
    };

    const total = Number(cart?.total || 0).toFixed(2);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Your Cart</h2>}>
            <Head title="Cart" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-2">{flash.error}</div>
                    )}
                    {errors?.quantity && (
                        <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-2">{errors.quantity}</div>
                    )}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        {cart.items.length === 0 ? (
                            <div>
                                <p className="text-gray-600">Your cart is empty.</p>
                                <Link href={route('products.index')} className="text-indigo-600 hover:underline">
                                    Continue shopping
                                </Link>
                            </div>
                        ) : (
                            <>
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-left border-b">
                                            <th className="py-2">Product</th>
                                            <th className="py-2">Price</th>
                                            <th className="py-2">Quantity</th>
                                            <th className="py-2">Line Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map((item) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="py-2">{item.product.name}</td>
                                                <td className="py-2">${Number(item.unit_price).toFixed(2)}</td>
                                                <td className="py-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="w-20 rounded border-gray-300"
                                                        defaultValue={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                    />
                                                </td>
                                                <td className="py-2">${Number(item.line_total).toFixed(2)}</td>
                                                <td className="py-2">
                                                    <SecondaryButton disabled={processing} onClick={() => removeItem(item.id)}>
                                                        Remove
                                                    </SecondaryButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-lg font-semibold">Total: ${total}</div>
                                    <PrimaryButton disabled={processing} onClick={checkout}>
                                        Checkout
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


