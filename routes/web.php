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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{path?}', function () {
    return view('website');
})->where('path', '[^admin]*');

Route::get('/admin/{path?}', function () {
    return view('admin');
})->where('path', '.*');


// The above routes uses laravel conditional routing using where() method and passing regular expression. 
// The first route represent the website home and return a simple view. 
// Here the path parameter will match anything except admin keyword. 
// The second route represent the admin panel so the path parameter will match anything after /admin.

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
