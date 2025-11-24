import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const cartCount = auth.cartCount ?? 0;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden items-center space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('products.index')} active={route().current('products.index')}>
                                    Products
                                </NavLink>
                                {auth.is_admin && (
                                    <NavLink href={route('admin.index')} active={route().current('admin.*')}>
                                        Admin
                                    </NavLink>
                                )}
                                <Link
                                    href={route('cart.index')}
                                    className="relative inline-flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    Cart
                                    <span className="ms-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white">
                                        {cartCount}
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* Notifications bell */}
                            <div className="relative me-4">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="relative rounded-md p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            {usePage().props.notifications?.unread_count > 0 && (
                                                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.1rem] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
                                                    {usePage().props.notifications.unread_count}
                                                </span>
                                            )}
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className="px-4 py-2 text-sm text-gray-600 border-b">Notifications</div>
                                        <div className="max-h-72 overflow-auto">
                                            {(usePage().props.notifications?.items || []).length === 0 ? (
                                                <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
                                            ) : (
                                                (usePage().props.notifications.items).map((n) => (
                                                    <Link key={n.id} href={n.url || '#'} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
                                                        {/* icon */}
                                                        {n.icon === 'alert' ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59c.75 1.335-.213 3.01-1.743 3.01H3.482c-1.53 0-2.493-1.675-1.743-3.01L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : n.icon === 'cart' ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M16 11V3a1 1 0 00-1-1H5a1 1 0 00-1 1v8H1l1 6h16l1-6h-3zM6 4h8v7H6V4z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10 2a6 6 0 00-6 6v3H3a1 1 0 000 2h14a1 1 0 100-2h-1V8a6 6 0 00-6-6zM7 15a3 3 0 006 0H7z" />
                                                            </svg>
                                                        )}
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-medium text-gray-800">{n.title}</div>
                                                            <div className="text-xs text-gray-500">{n.body}</div>
                                                            <div className="text-[11px] text-gray-400 mt-0.5">{n.created_at}</div>
                                                        </div>
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                        <form method="post" action={route('notifications.markAllRead')} className="border-t">
                                            <input type="hidden" name="_token" value={document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content')} />
                                            <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Mark all as read</button>
                                        </form>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
