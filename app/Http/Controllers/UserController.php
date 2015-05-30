<?php namespace App\Http\Controllers;

use DB;
use Auth;
use App\Models\User;
use App\Exceptions\NotLoggedInException;
use App\Http\Controllers\Controller;

class UserController extends Controller {
    
    private $user;
    
    public function __construct() {
        if(Auth::check()) {
            $this->user = Auth::user();
        } else {
            throw new NotLoggedInException;
        }
    }

    public function me() {
        return $this->json($this->user->getPublicInfo());
    }

}