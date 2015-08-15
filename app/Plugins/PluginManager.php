<?php namespace App\Plugins;

use File;
use Route;
use stdClass;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use App\Models\Plugin as Plugin;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PluginManager extends ServiceProvider {

    protected static $plugins;
    protected static $hooks;

    public function __construct() {
        self::$plugins = [];
        self::$hooks = [];
        $this->loadPlugins();
    }

    public function loadPlugins() {
        $plugins = Plugin->enablePluginsList();
        foreach ($plugins as $key=>$plugin){
            require_once(app_path() . '/Plugins/Plugins/' . $plugin->name . '/' . $plugin->name . '.php');
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

    public static function registerHook($id, $hook, $priority) { //what this?
        if(!isset(self::$hooks[$hook])) {
            self::$hooks[$hook] = [[], [], [], [], [], [], []];
        }
        array_push(self::$hooks[$hook][$priority], $id);
    }

    public static function callHook($hook, $args) { // this too?
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
