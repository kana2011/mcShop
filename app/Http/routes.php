<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

/*
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
*/

Route::post('api/{request}/{class?}',function($request,$class=NULL){
	return app()->make('App\\Http\\Controllers\\'.ucfirst(strtolower($request)).'Controller')->callAction(($class==NULL)?strtolower($request):strtolower($class), Input::all());
});

// Temporary use for test POST only
Route::get('gen', 'ApiController@gen');