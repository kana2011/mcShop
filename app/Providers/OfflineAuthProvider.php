<?php namespace App\Providers;

use App\User;
use App\Auth\AuthMeUserProvider;
use Illuminate\Support\ServiceProvider;

class OfflineAuthProvider extends ServiceProvider {

    public function boot()
    {
        $this->app['auth']->extend('offline',function()
        {
            return new AuthMeUserProvider();
        });
    }

    public function register()
    {
        
    }

}