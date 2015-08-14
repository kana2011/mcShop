<?php namespace App\Plugins\Plugins\TMTopup\Controllers;

use App\Http\Controllers\Controller;
use App\Plugins\PluginManager;
use stdClass;

class TopupController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function getIndex()
	{
		$args = [new stdClass];
		PluginManager::callHook("Test", $args);
		print_r($args);
	}

}
