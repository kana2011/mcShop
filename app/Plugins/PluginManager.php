<?php

namespace App\Plugins;

use File;
use stdClass;
use Illuminate\Support\ServiceProvider;

class PluginManager extends ServiceProvider {

    protected static $plugins;
    protected static $hooks;

    public function __construct() {
        self::$plugins = [];
        self::$hooks = [];
        $this->loadPluginsList();
    }

    public function loadPluginsList() {
        try
        {
            $this->loadPlugins(json_decode(File::get(app_path() . '/Plugins/plugins.json')));
        }
        catch (Illuminate\Filesystem\FileNotFoundException $exception)
        {
            File::put(File::get(app_path() . '/Plugins/plugins.json', '[]'));
        }
    }

    public function loadPlugins($plugins) {
        foreach($plugins as $plugin) {
            require_once(app_path() . '/Plugins/Plugins/' . $plugin . '/load.php');
            self::$plugins[] = new $plugin(count(self::$plugins));
        }
    }

    public function isDeferred() {
        return false;
    }

    public function register()
    {

    }

    public static function registerHook($plugin, $hook, $priority) {
        if(!isset(self::$hooks[$hook])) {
            self::$hooks[$hook] = [[], [], [], [], [], [], []];
        }
        array_push(self::$hooks[$hook][$priority], $plugin);
    }

    public static function callHook($hook, $args) {
        if(isset(self::$hooks[$hook])) {
            $hooksList = self::$hooks[$hook];
            foreach($hooksList as $priority) {
                foreach($priority as $plugin) {
                    call_user_func(array(self::$plugins[$plugin], 'On' . $hook), $args);
                }
            }
        }
        return $args;
    }

}
