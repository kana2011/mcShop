<?php namespace App\Http\Controllers;

use Validator;
use Input;
use Auth;
use App\Http\Controllers\Controller;
use App\Models\Token as Token;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthController extends Controller {

    public function TokenLogin()
    {
        $t = Token::findorfail(array('id',Input::get('token')));
        Auth::loginUsingId($t->userid);
    }

    public function Login()
    {
        $rules = array(
            'username'    => 'required|alphaNum|min:3',
            'password' => 'required|min:3'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            $json = array();
            $json['status'] = false;
            $json['error'] = "validation_error";
            return view("json")->with(array("json" => $json));
        } else {

            $userdata = array(
                'username'  => Input::get('username'),
                'password'  => Input::get('password'),
            );

            if (Auth::attempt($userdata)) {
                if(Input::get('generateToken')) {
                    $token = new Token;

                    $tokenId = "";
                    $seed = str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
                    while(true){
                        shuffle($seed);
                        foreach (array_rand($seed, 15) as $k) $tokenId .= $seed[$k];
                        try{
                            $t = Token::findorfail(array('id',$token));
                        } catch(ModelNotFoundException $e){
                            break;
                        }
                    }

                    $token->id = $tokenId;
                    $token->userid = Auth::user()->id;
                    $token->appname = Input::get('appname');
                    $token->save();

                    return view("json")->with(array("json" => array("status" => true,
                                                                    "token" => $tokenId)));
                } else {
                    return view("json")->with(array("json" => array("status" => true)));
                }
            } else {
                return view("json")->with(array("json" => array("status" => false,
                                                                "error" => "credentials_error"
                                                               )));
            }
        }
    }

    public function check() {
        return $this->json(array("result" => Auth::check()));
    }

    public function logout() {
        Auth::logout();
        return view("json")->with(array("json" => array("status" => true)));
    }

}
