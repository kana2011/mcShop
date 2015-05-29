<?php namespace App\libraries;

use App\libraries\rcon;

class mcRcon extends RCon {

    function mcSendCommand($Command) {
        $this->_Write(SERVERDATA_EXECCOMMAND,$Command,'');
    }

    function mcRconCommand($Command) {
        $this->mcSendcommand($Command);

        $ret = $this->Read();

        return $ret[$this->_Id]['S1'];
    }
}