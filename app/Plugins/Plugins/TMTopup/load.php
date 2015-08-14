<?php

use App\Plugins\PluginManager;

class TMTopup {
    protected $id;

    public function __construct($id) {
        $this->id = $id;
    }

    public function onLoad() {
        PluginManager::registerHook($this->id, 'getTopupMethod', 0);
        PluginManager::registerController($this->id, 'topup', 'TopupController');
    }

    public function onGetTopupMethod($obj) {
        $obj->method = "TMTopup";
    }

}
