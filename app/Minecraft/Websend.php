<?php namespace App\Minecraft;

use Config;
use App\libraries\mcWebsend;

class Websend {

    private $host;
    private $port;
    private $pass;
    private $ws;

    public function __construct() {
        $info = Config::get('websend.connection');
        $this->host = $info['host'];
        $this->port = $info['port'];
        $this->pass = $info['pass'];
    }

    public function connect() {
        $this->ws = new mcWebsend($this->host, $this->pass, $this->port);
        return $this->ws->connect();
    }

    public function sendCommand($cmd) {
        return $this->ws->doCommandAsConsole($cmd);
    }

    public function disconnect() {
		return $this->ws->disconnect();
    }

}
