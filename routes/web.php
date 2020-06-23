<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/admin/{routes?}', function () {
    return view('admin');
})->where('routes', '^((?!api).)*$');;

Route::get('{reactRoutes?}', function () {
    return view('app');
})->where('reactRoutes', '^((?!api).)*$');



Route::prefix('api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('init', 'AuthController@init');
        Route::post('login', 'AuthController@login');
        Route::post('register', 'AuthController@register');
        Route::post('logout', 'AuthController@logout');
    });
    Route::prefix('admin')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::get('init', 'AdminAuthController@init');
            Route::post('login', 'AdminAuthController@login');
            Route::post('register', 'AdminAuthController@register');
            Route::post('logout', 'AdminAuthController@logout');
        });

        Route::prefix('user')->group(function () {
            Route::get('getUserById/{id}', 'AdminUserController@getUserById');
            Route::get('browse', 'AdminUserController@browse');
            Route::post('create', 'AdminUserController@create');
            Route::post('update/{id}', 'AdminUserController@update');
            Route::post('delete/{id}', 'AdminUserController@delete');
        });

        Route::prefix('page')->group(function () {
            Route::get('getPageById/{id}', 'AdminPagesController@getPageById');
            Route::get('browse', 'AdminPagesController@browse');
            Route::post('create', 'AdminPagesController@createDraft');
            Route::post('update', 'AdminPagesController@updateDraft');
            Route::post('delete', 'AdminPagesController@deletePage');
        });
    });
});
