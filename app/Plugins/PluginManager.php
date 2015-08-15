<?php namespace App\Plugins;

use File;
use Route;
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
        if (File::exists(app_path() . '/Plugins/plugins.json')) {
            $this->loadPlugins(json_decode(File::get(app_path() . '/Plugins/plugins.json')));
        } else {
            $plugins = array_map('basename', File::directories(app_path() . '/Plugins/Plugins/'));
            File::put(app_path() . '/Plugins/plugins.json', json_encode($plugins));
            $this->loadPluginsList();
        }
    }

    public function loadPlugins($plugins) {
        foreach($plugins as $plugin) {
            require_once(app_path() . '/Plugins/Plugins/' . $plugin . '/' . $plugin . '.php');
            $container = new stdClass;
            $container->name = $plugin;
            $container->class = new $plugin(count(self::$plugins));
            self::$plugins[] = $container;
            $container->class->OnLoad();
        }
    }

    public function isDeferred() {
        return false;
    }

    public function register()
    {

    }

    public static function registerController($id, $name, $class_name) {
        $plugin = self::$plugins[$id];
        Route::controller($plugin->name . '/' . $name, 'App\\Plugins\\Plugins\\' . $plugin->name . '\\Controllers\\' . $class_name);
    }

    public static function registerHook($id, $hook, $priority) {
        if(!isset(self::$hooks[$hook])) {
            self::$hooks[$hook] = [[], [], [], [], [], [], []];
        }
        array_push(self::$hooks[$hook][$priority], $id);
    }

    public static function callHook($hook, $args) {
        if(isset(self::$hooks[$hook])) {
            $hooksList = self::$hooks[$hook];
            foreach($hooksList as $priority) {
                foreach($priority as $plugin) {
                    call_user_func_array(array(self::$plugins[$plugin]->class, 'on' . $hook), $args);
                }
            }
        }
        return $args;
    }

}
