import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function DailySales({ lines, totalRevenue, date }) {
    const { auth, flash } = usePage().props;
    const { post, processing } = useForm({});

    const sendNow = () => {
        post(route('admin.reports.daily.send'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Daily Sales Report ({date})</h2>}>
            <Head title="Daily Sales Report" />
            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
                    )}
                    <div className="bg-white rounded-lg shadow p-6">
                        {lines.length === 0 ? (
                            <div className="text-gray-600">No sales recorded today.</div>
                        ) : (
                            <table className="min-w-full">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="py-2">Product</th>
                                        <th className="py-2">Quantity</th>
                                        <th className="py-2">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lines.map((l, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="py-2">{l.name}</td>
                                            <td className="py-2">{l.quantity}</td>
                                            <td className="py-2">${Number(l.revenue).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-lg font-semibold">Total: ${Number(totalRevenue).toFixed(2)}</div>
                            <PrimaryButton disabled={processing} onClick={sendNow}>
                                Send report now
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


