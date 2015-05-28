<?php namespace App\Http\Controllers;

use DB;
use Auth;
use App\Http\Controllers\Controller;

class UserController extends Controller {

    public function myInfo()
    {
        if(Auth::check()) {
            $info = DB::select('select id, username, money from authme where id = ?', [Auth::user()->id]);
            return view("json")->with(array("json" => array("status" => true, "result" => $info)));
        }
    }

}