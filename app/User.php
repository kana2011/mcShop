<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;
    
    protected $userdata;

    public function __construct($userdata) {
        $this->userdata = $userdata;
    }
    
    public function getId() {
        return $this->userdata->id;
    }
    
    public function getUsername() {
        return $this->userdata->username;
    }
    
    public function getPasswordHash() {
        return $this->userdata->password;
    }

}
