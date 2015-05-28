<?php namespace App\Minecraft;

interface MinecraftConnectionInterface {
    
    public function connect();
    
    public function playerCommand();
    
    public function serverCommand();
    
    public function disconnect();
    
}