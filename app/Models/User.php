<?php namespace App\Models;

use App\Models\Transaction as Transactions;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    public function makeTransaction($amount, $description, $txid = NULL, $status = 1) { //status: 0 = error 1 = success 2 = pending
        $transaction = new Transaction;

        if($txid == NULL){ // generating txid
            $txid = "";
            $seed = str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
            while(true){
                shuffle($seed);
                foreach (array_rand($seed, 9) as $k) $txid .= $seed[$k];
                try{
                    $t = Transaction::findorfail(array('txid',$txid));
                } catch(ModelNotFoundException $e){
                    break;
                }
            }
        }

        // insert transaction record
        $transaction->txid = $txid;
        $transaction->user_id = $this->id;
        $transaction->amount = $amount;
        $transaction->description = $description;
        $transaction->status = $status;
        // process yeah
        $transaction->save();
    }

    public function getMoney() {
        $sum = 0;
        $transactions = $this->getTransactions(1);
        foreach($transactions as $transaction) {
            $sum = $sum + $transaction->amount;
        }
        return $sum;
    }

    public function updateStatus($txid,$status = 1){
        try {
            $transaction = Transactions::firstOrFail($txid); //just get the first result
        } catch(ModelNotFoundException $e){
            return false; //sent44: what I have to return? paphonbth: Just return false(meaning its not successful)
        }
        $transaction->status = $status;
        $transaction->save();
		return true;
    }

    public function updateDescription($txid,$description){
        try {
            $transaction = Transactions::firstOrFail($txid); //only first
         } catch(ModelNotFoundException $e){
            return false; //return false
        }
        $transaction->description = $description;
        $transaction->save();
        return true;
    }

    public function updateAmont($txid,$amount){
        try {
            $transaction = Transactions::firstOrFail($txid); //first yeah
         } catch(ModelNotFoundException $e){
            return false;
        }
        $transaction->amount = $amount;
        $transaction->save();
        return true;
    }

	public function getTransactions($status = -1) {
		//any status
		if($status == -1) return Transactions::where('user_id', '=', $this->id)->orderBy('created_at', 'desc')->get()->all();
		//status = $status
        if($status >= 0 && $status <= 3) return Transactions::where('user_id', '=', $this->id)->where('status','=', $status)->orderBy('created_at', 'desc')->get()->all();
	}

}
