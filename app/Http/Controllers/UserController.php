<?php namespace App\Http\Controllers;

use DB;
use Auth;
use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller {
    
    private $user;
    
    public function __construct() {
        $this->middleware('auth');
        $this->user = Auth::user();
    }

    public function myInfo() {
        return $this->json($this->user->getPublicInfo());
    }

}