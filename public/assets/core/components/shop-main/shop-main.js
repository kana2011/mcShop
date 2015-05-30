var app;
Polymer({
    is: "shop-main",
    ready: function() {
        app = this;
        this.loading = true;
        this.loadApp();
    },
    loadApp: function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../../../../api/auth:check"
        }).done(function(data) {
            if(data.result) {
                app.loadData();
            } else {
                app.loading = false;
                app.showLogin = true;
                app.checkLogin = app.checkLoginFunc;
            }
        });
    },
    loadData: function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../../../../api/user:me"
        }).done(function(data) {
            console.log(data);
            app.user = {};
            app.user.id = data.id;
            app.user.username = data.username;
            app.user.money = data.money;
            app.loading = false;
            app.showMain = true;
        });
    },
    checkLoginFunc: function(event, detail, sender) {
        alert("test");
    }
});

// custom transformation: scale header's title
addEventListener('paper-header-transform', function (e) {
//console.log(e);
var d = e.detail, 
	m = d.height - d.condensedHeight,
	scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75),
	titleStyle = document.querySelector('[mcShop-title]').style;
	titleStyle.transform = titleStyle.webkitTransform = 'scale(' + scale + ') translateZ(0px)';
	titleStyle.transformOrigin = titleStyle.webkitTransformOrigin = 'left';
});
document.querySelector('[mcShop-menu]').onclick = function(e) {
	this.async(function() {
		console.log(this.selected);
		var count = document.querySelectorAll('paper-item[clickable]');
		document.querySelector('[mcShop-contents]').selected = this.selected;
	});
};
addEventListener('core-responsive-change', function (e) {
	var d = e.detail;
	if(d.narrow === true){

	}
})