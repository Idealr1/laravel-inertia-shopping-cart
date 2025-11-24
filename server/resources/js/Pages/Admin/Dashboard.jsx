import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;
    const { post, processing } = useForm({});

    const sendReport = () => post(route('admin.reports.daily.send'));

    const Card = ({ title, value, subtitle, icon, href, action }) => (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm text-gray-500">{title}</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
                    {subtitle && <div className="mt-1 text-sm text-gray-500">{subtitle}</div>}
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex gap-3">
                {href && (
                    <Link href={href} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View
                    </Link>
                )}
                {action}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card
                            title="Products"
                            value={stats.products}
                            subtitle={`${stats.lowStock} low on stock`}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 3a2 2 0 00-2 2v9a2 2 0 002 2h6V3H4z" />
                                    <path d="M14 3h2a2 2 0 012 2v3h-4V3zM14 9h4v5a2 2 0 01-2 2h-2V9z" />
                                </svg>
                            }
                            href={route('admin.products.index')}
                        />
                        <Card
                            title="Orders Today"
                            value={stats.ordersToday}
                            subtitle={`Revenue $${Number(stats.revenueToday).toFixed(2)}`}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M16 11V3a1 1 0 00-1-1H5a1 1 0 00-1 1v8H1l1 6h16l1-6h-3zM6 4h8v7H6V4z" />
                                </svg>
                            }
                            href={route('admin.orders.index')}
                        />
                        <Card
                            title="Daily Sales Report"
                            value="Today"
                            subtitle="Send to admin"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 5a2 2 0 012-2h5v6H2V5zM2 9h9v8H4a2 2 0 01-2-2V9zM13 3h3a2 2 0 012 2v3h-5V3zM13 9h5v6a2 2 0 01-2 2h-3V9z" />
                                </svg>
                            }
                            href={route('admin.reports.daily')}
                            action={
                                <PrimaryButton disabled={processing} onClick={sendReport}>
                                    Send now
                                </PrimaryButton>
                            }
                        />
                        <Card
                            title="Quick Create"
                            value="New Product"
                            subtitle="Add an item to the catalog"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                                </svg>
                            }
                            href={route('admin.products.create')}
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="text-lg font-semibold text-gray-900">Manage</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href={route('admin.products.index')} className="rounded-lg border bg-gray-50 px-4 py-3 text-gray-700 hover:bg-gray-100">
                                    Products
                                </Link>
                                <Link href={route('admin.orders.index')} className="rounded-lg border bg-gray-50 px-4 py-3 text-gray-700 hover:bg-gray-100">
                                    Orders
                                </Link>
                                <Link href={route('admin.reports.daily')} className="rounded-lg border bg-gray-50 px-4 py-3 text-gray-700 hover:bg-gray-100">
                                    Reports
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="text-lg font-semibold text-gray-900">Tips</div>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Use “Send now” to email today’s sales report instantly to the admin.</li>
                                <li>Low‑stock alerts fire automatically on save/checkout and show in the bell.</li>
                                <li>Products with low stock display a red stock count in the catalog.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


