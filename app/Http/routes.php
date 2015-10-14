<?php

//use Illuminate\Routing\Controller;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::post('/', 'HomeController@index');
//Route::get('home', 'HomeController@index');

/*
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
*/

Route::get('assets/item/{file}',function($file){
	return app()->make("App\\Http\\Controllers\\HomeController")->callAction("getItemPic", [$file]);
});

Route::post('api/{method}/{par?}',function($method,$par=""){
	$class = "";
	$fn = "";
	if(strpos($method,':')) {
		$arr = explode(":", $method);
    	$class = ucfirst(strtolower($arr[0]));
    	$fn = ucfirst(strtolower($arr[1]));
	}else{
		$class = ucfirst(strtolower($method));
		$fn = $class;
	}
	$controller = 'App\\Http\\Controllers\\'.$class.'Controller';
	if(!class_exists($controller)) return view("json")->with(array("json" => array("error" => 'unknown_class_"'.$class.'"_error')));
	if(!method_exists(new $controller(),$fn)) return view("json")->with(array("json" => array("error" => 'unknown_method_"'.$fn.'"_error')));
	if($par!=""){
		$arr = explode('/', $par);
		$a = array();
		foreach ($arr as $key => $value) {;
			if($value=="") continue;
			if(strpos($value,":")){
				$ar = explode(":", $value);
				$a[$ar[0]] = $ar[1];
			}else{
				$a['par'.$key] = $value;
			}
		}
		$a['parraw'] = $par;
		Input::merge($a);
	}
	return app()->make($controller)->callAction($fn,array());
})->where('par', '.*');

Route::any('{p?}/{r?}',function($p="",$r=""){
	App::abort(404, 'File not found');
})->where(['r'=>'.*','p'=>'^(?:(?!(assets|api|images)).)*$']);

Route::any('api/{r?}',function($r=""){
	App::abort(403, 'No Permission');
})->where('r','.*');
