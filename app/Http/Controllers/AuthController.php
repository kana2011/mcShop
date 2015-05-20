<?php namespace App\Http\Controllers;

use Validator;
use Input;
use Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller {

    public function login()
    {
        $rules = array(
            'username'    => 'required|alphaNum|min:3',
            'password' => 'required|alphaNum|min:3'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            $json = array();
            $json['status'] = false;
            $json['error'] = "validation_error";
            return view("json")->with(array("json" => $json));
        } else {

            $userdata = array(
                'username'     => Input::get('username'),
                'password'  => Input::get('password')
            );

            if (Auth::attempt($userdata)) {
                return view("json")->with(array("json" => array("status" => true)));
            } else {        
            
                return view("json")->with(array("json" => array("status" => false,
                                                                "error" => "credentials_error"
                                                               )));
            }
        }
    }

}
