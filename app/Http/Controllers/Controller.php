<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;
    
    public function success($result) {
        return $this->json(array("status" => true, "result" => $result));
    }
    
    public function failed($error) {
        return $this->json(array("status" => false, "error" => $error));
    }
    
    public function json($json) {
        return view("json")->with(array("json" => $json));
    }

}
