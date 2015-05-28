<?php namespace App\Models;

use App\Models\Transaction as Transactions;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	protected $table = 'authme';

	protected $fillable = ['username', 'password', 'money'];

	protected $hidden = ['password', 'remember_token'];
    
    public function getPublicInfo() {
        $info = array();
        $info['id'] = $this->id;
        $info['username'] = $this->username;
        $info['money'] = $this->getMoney();
        return $info;
    }
    
    public function makeTransaction($amount, $description) {
        $transaction = new Transaction;
        $transaction->amount = $amount;
        $transaction->description = $description;
        $transaction->save();
    }
    
    public function getMoney() {
        $sum = 0;
        $transactions = Transactions::where('user_id', '=', $this->id)->get()->all();
        foreach($transactions as $transaction) {
            $sum = $sum + $transaction->amount;
        }
        return $sum;
    }

}
