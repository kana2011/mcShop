<?php namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\View;

class ApiController extends Controller {
	
	public function __construct(){
		
	}

	public function request() {
		$input = Input::json();
		if(empty($request = $input->get("request"))) return '{"Error":"No request"}';
		$requests = strtolower ($request);
		if(!method_exists($this,$requests)) return '{"Error":"'.$request.' is not defind"}';
		return $this->$requests($input);
	}
	
	public function itemlist(){
		//sample data
		$item = array();
		array_push($item,array("itemID" => 1,"itemName" => "ดาบตีล้านๆ","itemDesc" => "ดาบที่แมร่งไม่มีใครหาได้สักคนนอกจากแอดมิน Reimu เสกให้","itemPrice" => 6666666));
		array_push($item,array("itemID" => 2,"itemName" => "Bad Apple feat.nomico","itemDesc" => "แอปเปิ้ลที่ยังไม่ได้ทำกรรมวิธีใดๆ เด็ดจากหลังคฤหาสน์ Scarlet Devil","itemPrice" => 111111111));
		array_push($item,array("itemID" => 3,"itemName" => "Music Disc 'U.N. Owen Was Her?'","itemDesc" => "ดอนดั้น ดอนๆ ดั้น...","itemPrice" => 100));
		$json = array("items"=>$item);
		return view("json")->with(array("json" => $json));
	}
	
	public function gen(){
		return csrf_token();
	}
}