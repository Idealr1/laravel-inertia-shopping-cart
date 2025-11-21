import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ThankYou() {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Order Complete</h2>}>
            <Head title="Thank You" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-semibold mb-2">Thank you for your purchase!</h1>
                    <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                    <div className="flex justify-center gap-4">
                        <Link href={route('products.index')} className="text-indigo-600 hover:underline">
                            Continue Shopping
                        </Link>
                        <Link href={route('dashboard')} className="text-gray-600 hover:underline">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


