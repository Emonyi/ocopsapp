<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Auth\\LoginController@login')->name('login');


//topics
Route::get('/topics', 'TopicsController@index');
Route::get('/topics/create', 'TopicsController@create');
Route::post('/topics/store', 'TopicsController@store');
Route::get('/topics/edit/{id}', 'TopicsController@edit');
Route::put('/topics/update/{id}', 'TopicsController@update');
Route::delete('/topics/delete/{id}', 'TopicsController@destroy');

//polls
Route::get('/polls', 'PollsController@index');
Route::get('/polls/create', 'PollsController@create');
Route::post('/polls/store', 'PollsController@store');
Route::get('/polls/edit/{id}', 'PollsController@edit');
Route::put('/polls/update/{id}', 'PollsController@update');
Route::delete('/polls/delete/{id}', 'PollsController@destroy');
Route::get('/polls/poll_question', 'PollsController@index');
Route::get('/questions/question/{id}', 'PollsController@question');

//questions
Route::get('/questions', 'PollsController@index');
Route::post('/questions/store', 'QuestionsController@store');

//admin_ users
Route::get('users/create', 'UsersController@create');
Route::get('users/index', 'UsersController@index');
Route::post('users','UsersController@store');
Route::get('users/edit/{id}','UsersController@edit');
Route::put('users/update/{id}','UsersController@update');
