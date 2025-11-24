import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function Index({ orders }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Admin: Orders</h2>}>
            <Head title="Admin Orders" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2">Order #</th>
                                    <th className="py-2">Customer</th>
                                    <th className="py-2">Total</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Created</th>
                                    <th className="py-2">Lines</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id} className="border-b align-top">
                                        <td className="py-2">{o.id}</td>
                                        <td className="py-2">{o.user.name}<div className="text-xs text-gray-500">{o.user.email}</div></td>
                                        <td className="py-2">${Number(o.total).toFixed(2)}</td>
                                        <td className="py-2">{o.status}</td>
                                        <td className="py-2">{o.created_at}</td>
                                        <td className="py-2">
                                            <ul className="list-disc ps-5">
                                                {o.lines.map((l, idx) => (
                                                    <li key={idx}>{l.product} × {l.quantity} @ ${Number(l.unit_price).toFixed(2)}</li>
                                                ))}
                                            </ul>
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


