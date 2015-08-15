<?php namespace App\Plugins;

use File;
use Route;
use Config;
use stdClass;
use App\Models\Plugin;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Capsule\Manager as Capsule;

class PluginManager extends ServiceProvider {

    protected static $plugins;
    protected static $hooks;

    public function __construct() {
        self::$plugins = [];
        self::$hooks = [];
        $this->bootEloquent();
        //$this->scanPlugins();
        $this->loadEnabledPlugins();
    }

    public function bootEloquent() {
        $capsule = new Capsule;
        $capsule->addConnection(Config::get('database.connections.mysql'));
        $capsule->bootEloquent();
    }

    public function loadEnabledPlugins() {
        $plugins = Plugin::where('enabled', '=', '1')->get();
        foreach($plugins as $pl) {
            $plugin = $pl->name;
            require_once(app_path() . '/Plugins/Plugins/' . $plugin . '/' . $plugin . '.php');
            $container = new stdClass;
            $container->name = $plugin;
            $container->class = new $plugin($pl->id);
            self::$plugins[] = $container;
            $container->class->onLoad();
        }
    }

    public function scanPlugins() {
        Plugin::truncate();
        $plugins = array_map('basename', File::directories(app_path() . '/Plugins/Plugins/'));
        foreach($plugins as $plugin) {
            $pl = new Plugin;
            $pl->name = $plugin;
            $pl->save();
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
