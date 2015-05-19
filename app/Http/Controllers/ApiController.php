<?php namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;

class ApiController extends Controller {
	
	public function __construct(){
		
	}

	public function request() {
		$input = Input::json();
		if(!property_exists($input, 'request')) return csrf_token();
		$request = strtolower ($input->request);
		$request($input);
	}
	
	public function itemlist($input){
		//sample data
		$item = array();
		$item = array("itemID" => 1,"itemName" => "ดาบตีล้านๆ","itemDesc" => "ดาบที่แมร่งไม่มีใครหาได้สักคนนอกจากแอดมิน Reimu เสกให้","itemPrice" => 6666666);
		$item = array("itemID" => 2,"itemName" => "Bad Apple feat.nomico","itemDesc" => "แอปเปิ้ลที่ยังไม่ได้ทำกรรมวิธีใดๆ เด็ดจากหลังคฤหาสน์ Scarlet Devil","itemPrice" => 111111111);
		$item = array("itemID" => 3,"itemName" => "Music Disc 'U.N. Owen Was Her?'","itemDesc" => "ดอนดั้น ดอนๆ ดั้น...","itemPrice" => 100);
		return View::make("json")->with(array("json" => $item));
	}
	
	public function gen(){
		return csrf_token();
	}
}