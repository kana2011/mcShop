<?php namespace App\Plugins\Plugins\TMTopup\Controllers;

use App\Models\user;
use App\Http\Controllers\Controller;
use App\Plugins\PluginManager;
use App\Plugins\Plugins\TMTopup\libs\Crypt_AES;
use Input;
use Config;
use stdClass;

class ApiController extends Controller {

	public function __construct()
	{
	}

	public function getIndex()
	{
		//if($_SERVER['REMOTE_ADDR'] == '203.146.127.115' && isset($_GET['request']))
		if(isset($_GET['request']))
		{
			$aes = new Crypt_AES();
			$aes->setKey(Config::get('tmtopup.passkey'));
			$request = Input::get("request");
			$request = base64_decode(strtr($request, '-_,', '+/='));
			$request = $aes->decrypt($request);
			parse_str($request, $request);
			$request['Ref1'] = base64_decode($request['Ref1']);

			$user = User::where('id', '=', $request['Ref1'])->first();
			if ($user === null) {
				echo "ERROR|INVALID_ID";
			} else {
				$amounts = Config::get('tmtopup.amounts');
				$user->makeTransaction($amounts['TMT' . $request['cardcard_amount']], "Topup with TrueMoney: " . $request['cardcard_password'], "TMT-" . $request['TXID']);
				echo "SUCCEED";
			}
		} else {
			echo "ACCESS_DENIED";
		}

	}

}
