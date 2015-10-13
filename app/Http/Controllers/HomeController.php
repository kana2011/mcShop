<?php namespace App\Http\Controllers;

use View;
use Config;
use DB;
use Input;

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
		//Input::get('path');
		//Input::get('statusCode');
		//Input::get('reason');
		return View::make('home')->withTitle(Config::get('mcshop.title'));
	}

	public function shop()
	{
        $result = array();
        $groups = DB::select('select * from shopgroup');
        foreach($groups as $group) {
            $items = DB::select('select id, dispname, igroup, icomment, price from shopitem where igroup = ?', [$group->id]);
            foreach ($items as $item) {
                $item->bg = "background-image: url(assets/item/" . $item->id . ".jpg);";
            }
            $group->items = $items;
            $result[] = $group;
        }
        $fResult['shop'] = $result;
        return $this->json($fResult);
	}

	public function getItemPic($file) {
		$file = explode(".jpg", $file)[0];
		if(!is_numeric($file)) {
			return $this->failed("invalid_file_name");
		} else {
			header('Content-Type: image/jpeg');
			if(file_exists("images/items/" . $file . ".jpg")) {
				readfile("images/items/" . $file . ".jpg");
			} else {
				readfile("images/placeholder.jpg");
			}
		}
	}

}
