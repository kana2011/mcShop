<?php namespace App\Http\Controllers;

use DB;
use Auth;
use Input;
use App\Exceptions\NotLoggedInException;
use App\Models\ShopItem;
use App\Minecraft\MinecraftConnection as Minecraft;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ShopController extends Controller {

    private $user;

    public function __construct() {
        $this->validateToken();
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
            $items = DB::select('select id, dispname, igroup, icomment, price from shopitem where igroup = ?', [$group->id]);
            $group->items = $items;
            $result[] = $group;
        }
        return $this->success($result);
    }

    public function buy() {
        //find the item
        try{
            $item = ShopItem::where('id', '=', Input::get('itemid'))->firstOrFail();
        }catch(ModelNotFoundException $e){
            return $this->failed("item_doesn't_exist");
        }
        //if enough money
        if($this->user->getMoney() >= $item->price) {
            //make transaction
            $txid = $this->user->makeTransaction(-$item->price, "Buying " . $item->dispname,NULL,2);
            $minecraft = Minecraft::getAdapter();
            //connect to mc server
            if($minecraft->connect()) {
                $minecraft->sendCommand(str_replace("%player%", $this->user->username, $item->cmd));
                $this->user->updateStatus($txid);
                $this->user->updateDescription($txid,"Bought " . $item->dispname);
                return $this->success($this->user->getMoney());
            } else {
                //connection failed
                $this->user->updateStatus($txid,0);
                $this->user->updateDescription($txid,"Server offline while buying " . $item->dispname);
                return $this->failed("server_offline");
            }
        } else {
            return $this->failed("not_enough_money");
        }
    }
}
