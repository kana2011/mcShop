<?php namespace App\Http\Controllers;

use App\Models\User as Users;

class TmpayController extends Controller {


	public function __construct(){
		//I dont know where to store config
		$this->response_url = "http://localhost/api/tmpay:response";
		$this->merchant_id = "TEST";
	}

	public function request(){ //user request
		//request tmpay api
		$content = file_get_contents("https://www.tmpay.net/TPG/backend.php?merchant_id=".$merchant_id."&password=".Input::get("tmpassword")."&resp_url=".$response_url);
		if(strpos($content,'SUCCEED') !== FALSE){ // on success
			$arr = explode("|", $content);
			Users::makeTransaction(0,"Buying with Turemoney",$arr[1],2);
			return $this->success("transaction_created");
		}else{ //on error
			if(strpos($content,'ERROR') !== FALSE){ //error from tmpay
				$arr = explode("|", $content);
				return $this->failed(strtolower($arr[1]));
			}else{ //else?
				return $this->failed("unknown_error");
			}
		}
	}

	public function response(){ // tmpay response
		if("remote_address" != "remote_address") return; //return 403 later
		if(Input::get("status") == 1){ //success process
			if(!Users::updateDescription(Input::get("transaction_id"),"Topup with Turemmoney")) return View::make('blank', array('echo' => 'ERROR|UNKNOWN_TXID'));
			Users::updateAmont(Input::get("transaction_id"),Input::get("real_amount"));
			Users::updateStatus(Input::get("transaction_id"),1);
			return View::make('blank', array('echo' => 'SUCCESS|'.Input::get("transaction_id")));
		}
		// try to set status to error
		if(!Users::updateStatus(Input::get("transaction_id",0))) return View::make('blank', array('echo' => 'ERROR|UNKNOWN_TXID'));
		if(Input::get("status") == 3){ // used turemoney
			Users::updateDescription(Input::get("transaction_id"),"Turemmoney used");
			return View::make('blank', array('echo' => 'ERROR|USED_TUREMONEY'));
		}
		if(Input::get("status") == 4){ // invalid turemoney
			Users::updateDescription(Input::get("transaction_id"),"Invalid Turemmoney");
			return View::make('blank', array('echo' => 'ERROR|INVALID_TUREMONEY'));
		}
		if(Input::get("status") == 5){ // turemove
			Users::updateDescription(Input::get("transaction_id"),"Turemmove card is not allow");
			return View::make('blank', array('echo' => 'ERROR|USED_TUREMOVE'));
		}
	}
}

