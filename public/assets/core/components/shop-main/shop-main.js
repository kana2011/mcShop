var app;
Polymer({
    is: "shop-main",
    ready: function() {
        app = this;
        this.loading = true;
        this.logout = this.logoutFunc;
        this.selectedPage = 1;
        this.loadApp();
    },
    listeners: {
        'login-start': 'checkLoginFunc',
        'open-item-dialog': 'openItemDialog'
    },
    loadApp: function() {
        app.showLogin = false;
        app.showMain = false;
        app.loading = true;
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/auth:check"
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
            url: "api/user:shop"
        }).done(function(data) {
            app.user = {};
            app.user.id = data.id;
            app.user.username = data.username;
            app.user.money = data.money;
            app.shop = data.shop;
            app.loading = false;
            app.showMain = true;
        });
    },
    checkLoginFunc: function(event, detail, sender) {
        var login = detail.me;
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../../../../api/auth:login",
            data: {
                username: detail.username,
                password: detail.password
            }
        }).done(function(data) {
            if(data.status) {
                app.loadApp();
                login.cla = "";
                login.username = "";
                login.password = "";
            } else {
                login.$.username.setAttribute("invalid", true);
                login.$.password.setAttribute("invalid", true);
            }
        });
    },
    openItemDialog: function(event, detail, sender) {
        var data = detail.data;
        this.itemData = data;
        $(this.$.itemDialogTitle).html(data.dispname);
        this.$.itemDialog.open();
    },
    buyItem: function() {
        this.$.loadingDialog.open();
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/shop:buy",
            data: {
                itemid: this.itemData.id
            }
        }).done(function(data) {
            app.$.loadingDialog.close();
            if(data.status) {
                $(app.$.mainToast).attr("text", "Item bought");
                app.$.mainToast.show();
            } else {
                $(app.$.mainToast).attr("text", capitalizeFirstLetter(lodashToSpace(data.error)));
                app.$.mainToast.show();
            }
        });
    },
    logoutFunc: function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/auth:logout"
        }).done(function(data) {
            app.loadApp();
            login.$.toast1.hide();
        });
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lodashToSpace(string) {
    return string.split("_").join(" ");
}
