<?php namespace App\Http\Controllers;

use DB;
use Auth;
use App\Models\User;
use App\Exceptions\NotLoggedInException;
use App\Http\Controllers\Controller;
use App\Plugins\PluginManager;
use stdClass;

class UserController extends Controller {

    private $user;

    public function __construct() {
        $this->validateToken();
        if(Auth::check()) {
            $this->user = Auth::user();
        } else {
            throw new NotLoggedInException;
        }
    }

    public function me() {
        return $this->json($this->user->getPublicInfo());
    }

    public function shop() {
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
        $fResult = $this->user->getPublicInfo();
        $fResult['shop'] = $result;
        $topupmethod = [new stdClass];
        $topupmethod[0]->method = "none";
        PluginManager::callHook("getTopupMethod", $topupmethod);
        $fResult['topupmethod'] = $topupmethod[0]->method;
        $pluginmenu = [new stdClass];
        $pluginmenu[0]->items = [];
        PluginManager::callHook("getPluginMenu", $pluginmenu);
        $fResult['pluginmenu'] = $pluginmenu[0]->items;
        return $this->json($fResult);
    }

    public function transactions() {
        return $this->success($this->user->getTransactions());
    }

}
