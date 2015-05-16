<?php namespace App\Library;

//to use this class
//use APP\Library\Payment;


class Payment {
	
	private $payment = "tmtopup"; // tmtopup tmpay paypal
	private $turemoney = NULL;
	
	public function __construct(){
		//...
	}
	
	public function changePaymentType($str){
		$this->payment = $str;
	}
	
	public function paymentType(){
		return $this->payment;
	}
	
	public function setTuremoney($str){
		$this->turemoney = $str;
	}
	
	public function turemoney(){
		return $this->turemoney;
	}
	
}

?>