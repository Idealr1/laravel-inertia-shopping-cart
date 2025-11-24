<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAllRead(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();
        return back()->with('success', 'Notifications cleared.');
    }
}


