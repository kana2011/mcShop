var app;
Polymer({
    is: "shop-main",
    ready: function() {
        app = this;
        this.loadingScreen = document.getElementById("loadingScreen");
        this.loading = true;
        this.logout = this.logoutFunc;
        this.selectedPage = 1;
        this.cartIsOpen = 0;
        this.topupLoaded = false;
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
        api.check(function(data) {
            if(data.result) {
                app.loadData();
                app.loadTransactions();
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
            app.cart = cart;
            app.user = {};
            app.user.id = data.id;
            app.user.username = data.username;
            app.user.money = data.money;
            app.shop = data.shop;
            app.topupmethod = data.topupmethod;
            app.loading = false;
            app.showMain = true;
            app.addDrawerMenuItems(data);
        });
    },
    addDrawerMenuItems: function(data) {
        if(document.getElementById('pluginmenu') != null) {
            $('#pluginmenu').html("");
            if(data.pluginmenu.length > 0) {
                var temp = "";
                for(var i = 0; i < data.pluginmenu.length; i++) {
                    temp += '<shop-drawer-item clickable><iron-icon icon="' + data.pluginmenu[i].icon + '"></iron-icon>' + data.pluginmenu[i].title + '</shop-drawer-item>';
                }
                temp += '<shop-divider></shop-divider>';
                $('#pluginmenu').html(temp);
            }
        } else {
            setTimeout(function() {
                app.addDrawerMenuItems(data);
            }, 100);
        }
    },
    loadTransactions: function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/user:transactions"
        }).done(function(data) {
            app.transactions = data.result;
            transactions.color();
        });
    },
    loadTopup: function() {
        if(!this.topupLoaded) {
            $('#topup').html('<topup-' + this.topupmethod.toLowerCase() + '></topup-' + this.topupmethod.toLowerCase() + '>');
            this.topupLoaded = true;
        }
    },
    checkLoginFunc: function(event, detail, sender) {
        var login = detail.me;
        var data = {
                username: detail.username,
                password: detail.password
            };
        api.login(data, false, function(data){
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
            app.loadTransactions();
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
    },
    openCart: function() {
        this.$.cartDialog.open();
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lodashToSpace(string) {
    return string.split("_").join(" ");
}
