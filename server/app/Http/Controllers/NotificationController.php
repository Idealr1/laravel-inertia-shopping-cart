<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAllRead(Request $request)
    {
        $user = $request->user();
        // Mark unread notifications as read using a query to avoid relying on collection helpers.
        $user->unreadNotifications()->update(['read_at' => now()]);
        return back()->with('success', 'Notifications cleared.');
    }
}


