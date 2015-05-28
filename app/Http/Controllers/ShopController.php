<?php namespace App\Http\Controllers;

use DB;
use Auth;
use Input;
use App\Models\ShopItem;
use App\Http\Controllers\Controller;

class ShopController extends Controller {
    
    private $user;
    
    public function __construct() {
        if(Auth::check()) {
            $this->user = Auth::user();
        }
    }

    public function getAll()
    {
        $result = array();
        $groups = DB::select('select * from shopgroup');
        foreach($groups as $group) {
            $items = DB::select('select id, dispname, igroup, icomment, cost from shopitem where igroup = ?', [$group->id]);
            $group->items = $items;
            $result[] = $group;
        }
        return $this->json(array("status" => true, "result" => $result));
    }
        
    public function buy() {
        $item = ShopItem::where('id', '=', Input::get('itemid'))->firstOrFail();
        if($this->user->getMoney() >= $item->price) {
            $this->user->makeTransaction(-$item->price, "Bought " . $item->dispname);
            return $this->json(array("status" => true));
        }
    }

}