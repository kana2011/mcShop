<?php

use App\Plugins\PluginManager;

class TMTopup {
    protected $id;

    public function __construct($id) {
        $this->id = $id;
    }

    public function onLoad() {
        $this->copyConfig();
        PluginManager::registerHook($this->id, 'getTopupMethod', 0);
        PluginManager::registerController($this->id, 'api', 'ApiController');
        PluginManager::registerController($this->id, 'topup', 'TopupController');
    }

    public function copyConfig() {
		File::copy(app_path() . '/Plugins/Plugins/TMTopup/config/config.php', app_path() . '/../config/tmtopup.php');
    }

    public function onGetTopupMethod($obj) {
        $obj->method = "TMTopup";
    }

}
