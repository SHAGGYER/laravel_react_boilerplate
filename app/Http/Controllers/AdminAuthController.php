<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function init() {
        $user = Auth::guard('admin')->user();

        return [
            'user' => $user
        ];
    }

    public function logout() {
        Auth::guard('admin')->logout();
        return true;
    }

    public function login(Request $request) {
        if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password], true)) {
            return [
                'user' => Auth::user()
            ];
        } else {
            return response()->json(['message' => 'Could not log you in.'], 500);
        }
    }
}
