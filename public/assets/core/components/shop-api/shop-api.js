var api;
Polymer({
	is: "shop-api",
	ready: function(){
		api = this;
	},
	do: function(url,data,beforesend,callback){
		beforesend = beforesend || false;
		data = data || null;
		$.ajax({
		    method: "POST",
		    dataType: "json",
		    url: "api/"+url,
		    data: data
		}).done(function(data) {
			console.log(data);
		    return callback(data);
		});
	},

	/*
	*	Login function all data must be object. not array...
	*	Example : 	{
					username:"kosaki",
					password:"onodera"
					}
	*/

	login: function(data,beforesend,callback){
		beforesend = beforesend || false;
		return this.do('auth:login',data,beforesend,callback);
	},
	check: function(callback){
		var beforesend = beforesend || false;
		return this.do('auth:check',null,beforesend,callback);
	},
	logout: function(){
		return this.do('auth:logout',null,beforesend,callback);
	},

	/*

		Drawer menu stuff...

	*/

	transactions: function(beforesend,callback,debug){
		debug = debug || false;
		return this.do('auth:check',null,callback,debug);
	},
})