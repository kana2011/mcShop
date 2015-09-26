<?php namespace App\Http\Controllers;

use View;
use Config;
use DB;

class HomeController extends Controller {

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
	public function index()
	{
		return View::make('home')->withTitle(Config::get('mcshop.title'));
	}

	public function shop()
	{
        $result = array();
        $groups = DB::select('select * from shopgroup');
        foreach($groups as $group) {
            $items = DB::select('select id, dispname, igroup, icomment, price from shopitem where igroup = ?', [$group->id]);
            $group->items = $items;
            $result[] = $group;
        }
        $fResult['shop'] = $result;
        return $this->json($fResult);
	}

}
