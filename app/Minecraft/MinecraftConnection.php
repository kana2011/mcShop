<?php namespace App\Minecraft;

use Config;

class MinecraftConnection {
    
    public static function getAdapter() {
        $class = Config::get('minecraft.adapter');
        return new $class();
    }
    
}