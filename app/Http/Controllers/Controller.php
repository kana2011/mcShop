<?php namespace App\Http\Controllers;

use Auth;
use Input;
use App\Models\Token as Token;
use App\Exceptions\NotLoggedInException;
use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Database\Eloquent\ModelNotFoundException;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;

	public function validateToken() {
		if(Input::get('token') != null) {
			try {
				$t = Token::where('id', '=', Input::get('token'))->firstOrFail();
				Auth::loginUsingId($t->userid);
			} catch(ModelNotFoundException $e){
				throw new NotLoggedInException();
			}
		}
	}

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
