import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Create() {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        stock_quantity: 0,
        low_stock_threshold: 5,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">New Product</h2>}>
            <Head title="New Product" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white rounded-lg shadow p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input className="w-full rounded border-gray-300" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input type="number" step="0.01" className="w-full rounded border-gray-300" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <input type="number" className="w-full rounded border-gray-300" value={data.stock_quantity} onChange={(e) => setData('stock_quantity', Number(e.target.value))} />
                                {errors.stock_quantity && <div className="text-red-600 text-sm mt-1">{errors.stock_quantity}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Low stock threshold</label>
                                <input type="number" className="w-full rounded border-gray-300" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', Number(e.target.value))} />
                                {errors.low_stock_threshold && <div className="text-red-600 text-sm mt-1">{errors.low_stock_threshold}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link href={route('admin.products.index')} className="rounded-md px-4 py-2 text-gray-700 hover:text-gray-900">
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing} type="submit">
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


