<?php namespace App\Auth;

use DB;
use App\User;
use Illuminate\Contracts\Auth\User as UserContract;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;

class AuthMeUserProvider implements UserProvider {

    public function __construct()
    {
        
    }

    public function retrieveById($identifier)
    {

    }

    public function retrieveByToken($identifier, $token)
    {

    }

    public function updateRememberToken(Authenticatable $user, $token)
    {

    }

    public function retrieveByCredentials(array $credentials)
    {
        $results = DB::select('select * from authme where username = ?', array($credentials['username']));
        if(count($results) == 1) {
            return new User($results[0]);
        }
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        return $this->validateHash($credentials['password'], $user->getPasswordHash());
    }
    
    private function validateHash($password, $hash) {
        $password_info=$hash;
        $sha_info = explode("$",$password_info);
        if($sha_info[1] === "SHA") {
            $salt = $sha_info[2];
            $sha256_password = hash('sha256', $password);
            $sha256_password .= $sha_info[2];;
            if( strcasecmp(trim($sha_info[3]),hash('sha256', $sha256_password) ) == 0 ) return true;
            else return false;
        }
    }
    
}