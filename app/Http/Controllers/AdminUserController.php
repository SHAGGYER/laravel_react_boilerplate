<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUserById($id) {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        $user->name = $request->name;

        if ($request->password) {
            $user->password = bcrypt($request->password);
        }

        if ($request->email) {
            $userExists = User::where('email', strtolower($request->email));
            if (isset($userExists->id)) {
                return response()->json(['message' => 'Email already exists'], 500);
            }
            $user->email = $request->email;
        }
        $user->role = $request->role;
        $user->save();
    }

    public function create(Request $request) {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;
        $user->save();
        return true;
    }

    public function browse(Request $request) {
        $users = User::query();

        if ($request->name) {
            $users = $users->where('name', 'LIKE', '%'.$request->name.'%');
        }
        if ($request->email) {
            $users = $users->where('email', 'LIKE', '%'.$request->email.'%');
        }
        if ($request->role) {
            $users = $users->where('role', '=', $request->role);
        }

        return $users->paginate(10);
    }

    public function delete(Request $request, $id) {
        $user = User::find($id);
        $user->delete();
        return true;
    }
}
