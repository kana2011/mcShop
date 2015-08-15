<?php namespace App\Plugins\Plugins\TMTopup\Controllers;

use App\Http\Controllers\Controller;
use App\Plugins\PluginManager;
use stdClass;

class TopupController extends Controller {

	public function __construct()
	{
	}

	public function getIndex()
	{
		$args = [new stdClass];
		PluginManager::callHook("Test", $args);
		print_r($args);
	}

}
