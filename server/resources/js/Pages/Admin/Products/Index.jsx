import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Index({ products }) {
    const { auth, flash } = usePage().props;
    const { delete: destroy } = useForm({});

    const remove = (id) => {
        if (!confirm('Delete this product?')) return;
        router.delete(route('admin.products.destroy', id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Admin: Products</h2>}>
            <Head title="Admin Products" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
                    )}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-lg font-semibold">Products</div>
                            <Link href={route('admin.products.create')} className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm">
                                New Product
                            </Link>
                        </div>
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Stock</th>
                                    <th className="py-2">Low threshold</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="py-2">{p.name}</td>
                                        <td className="py-2">${Number(p.price).toFixed(2)}</td>
                                        <td className="py-2">{p.stock_quantity}</td>
                                        <td className="py-2">{p.low_stock_threshold}</td>
                                        <td className="py-2">
                                            <Link href={route('admin.products.edit', p.id)} className="text-indigo-600 hover:underline me-4">
                                                Edit
                                            </Link>
                                            <button className="text-red-600 hover:underline" onClick={() => remove(p.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


