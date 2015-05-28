<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;
    
    public function json($json) {
        return view("json")->with(array("json" => $json));
    }

}
