<?php namespace App\libraries;

use Illuminate\Contracts\Hashing\Hasher;

class SHAHasher implements Hasher {

    /**
     * Hash the given value.
     *
     * @param  string  $value
     * @return array   $options
     * @return string
     */
    public function make($value, array $options = array()) {
        return hash('sha1', $value);
    }

    /**
     * Check the given plain value against a hash.
     *
     * @param  string  $value
     * @param  string  $hashedValue
     * @param  array   $options
     * @return bool
     */
    public function check($value, $hashedValue, array $options = array()) {
        $password = $value;
        $password_info=$hashedValue;
        $sha_info = explode("$",$password_info);
        if($sha_info[1] === "SHA") {
            $salt = $sha_info[2];
            $sha256_password = hash('sha256', $password);
            $sha256_password .= $sha_info[2];;
            if( strcasecmp(trim($sha_info[3]),hash('sha256', $sha256_password) ) == 0 ) return true;
            else return false;
        }
    }

    /**
     * Check if the given hash has been hashed using the given options.
     *
     * @param  string  $hashedValue
     * @param  array   $options
     * @return bool
     */
    public function needsRehash($hashedValue, array $options = array()) {
        return false;
    }

}