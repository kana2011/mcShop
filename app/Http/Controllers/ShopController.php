<?php namespace App\Http\Controllers;

use DB;
use Auth;
use Input;
use App\Exceptions\NotLoggedInException;
use App\Models\ShopItem;
use App\Minecraft\MinecraftConnection as Minecraft;
use App\Http\Controllers\Controller;

class ShopController extends Controller {
    
    private $user;
    
    public function __construct() {
        if(Auth::check()) {
            $this->user = Auth::user();
        } else {
            throw new NotLoggedInException;
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
        return $this->success($result);
    }
        
    public function buy() {
        $item = ShopItem::where('id', '=', Input::get('itemid'))->firstOrFail();
        if($this->user->getMoney() >= $item->price) {
            $this->user->makeTransaction(-$item->price, "Bought " . $item->dispname);
            $minecraft = Minecraft::getAdapter();
            if($minecraft->connect()) {
                $minecraft->sendCommand(str_replace("%player%", $this->user->username, $item->cmd));
                return $this->success($this->user->getMoney());
            } else {
                $this->user->makeTransaction($item->price, "Order failed: Server offline.");
                return $this->failed("server_offline");
            }
        }
    }

}