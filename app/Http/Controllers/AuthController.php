<?php

namespace App\Http\Controllers;

use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function init() {
        $user = Auth::user();

        return [
            'user' => $user
        ];
    }

    public function logout() {
        Auth::logout();
        return true;
    }

    public function login(Request $request) {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], true)) {
            return [
                'user' => Auth::user()
            ];
        } else {
            return response()->json(['message' => 'Could not log you in.'], 500);
        }
    }

    public function loginAdmin(Request $request) {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], true)) {
            $user = Auth::user();
            if ($user->role == 'user' || $user->role == 'moderator') {
                Auth::logout();
                return response()->json(['message' => 'Could not log you in'], 500);
            }

            return [
                'user' => $user
            ];
        } else {
            return response()->json(['message' => 'Could not log you in.'], 500);
        }
    }

    public function register(Request $request) {
        $user= new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = 'user';
        $user->save();

        Auth::login($user, true);
        return [
            'user' => $user
        ];
    }
}
