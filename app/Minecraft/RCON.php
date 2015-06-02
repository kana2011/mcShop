<?php namespace App\Minecraft;

use Config;
use App\libraries\mcRcon;

class RCON {

    private $host;
    private $port;
    private $pass;
    private $rcon;

    public function __construct() {
        $info = Config::get('rcon.connection');
        $this->host = $info['host'];
        $this->port = $info['port'];
        $this->pass = $info['pass'];
    }

    public function connect() {
        $this->rcon = new mcRcon($this->host, $this->port, $this->pass);
        return $this->rcon->Auth();
    }

    public function sendCommand($cmd) {
        return $this->rcon->mcRconCommand($cmd);
    }

    public function disconnect() {

    }

}
