<?php namespace App\Http\Controllers;

use DB;
use Auth;
use App\Http\Controllers\Controller;

class ShopController extends Controller {

    public function getAll()
    {
        if(Auth::check()) {
            $result = array();
            $groups = DB::select('select * from shopgroup');
            foreach($groups as $group) {
                $items = DB::select('select id, dispname, igroup, icomment, cost from shopitem where igroup = ?', [$group->id]);
                $group->items = $items;
                $result[] = $group;
            }
            return view("json")->with(array("json" => array("status" => true, "result" => $result)));
        }
    }

}