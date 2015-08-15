<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plugin extends Model{

	protected $table = 'plugin';

	public function pluginsList(){ //check from DB
		return $this->all();
	}

	public function enablePluginsList(){
		return $this->where('enable', '=', 1)->get()->all();
	}

	public function allPluginsList(){ //check from plugin dir

	}

	public function setPluginEnable($plugin,$status){
		try{
			$pl = $this->where('name','=',$plugin)->firstorfail();
		}catch(ModelNotFoundException $e){
			return false; //false right?
		}
		$pl->enable = $status;
		$pl->save();
		// should I return ture here?
	}

	public function installPlugin($plugin){

	}

	public function uninstallPlugin($plugin){

	}

	public function getPluginInfo($plugin){ //DB info

	}

	public function getFileInfo($plugin){ //raw info

	}

	public function updatePlugin($plugin){

	}
}