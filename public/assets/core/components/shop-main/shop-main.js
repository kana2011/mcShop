var app;
var r;
var first=true;
Polymer({
    is: "shop-main",
    ready: function() {
        app = this;
        this.setupRouter();
        this.loadingScreen = document.getElementById("loadingScreen");
        this.loading = true;
        this.logout = this.logoutFunc;
        this.selectedPage = 1;
        this.selectedShopPage = 0;
        this.cartIsOpen = 0;
        this.topupLoaded = false;
        this.logged = false;
        app.go('/');
    },
    setupRouter: function() {
        r = Rlite();

        r.add('', function() {
            app.loadApp();
        });

        r.add('shop', function () {
            app.selectedPage = 1;
        });

        r.add('shop/:group/:id', function (r) {
            if(app.logged) {
                var item = null;
                for(var i = 0; i < app.shop.length; i++) {
                    if(app.shop[i].id == r.params.group) {
                        var group = app.shop[i];
                        for(var j = 0; j < group.items.length; j++) {
                            if(group.items[j].id == r.params.id) {
                                item = group.items[j];
                                break;
                            }
                        }
                        break;
                    }
                }
                if(item != null) {
                    app.showItem(item);
                } else {
                    app.go('/shop');
                }
            } else {
                $(app.$.mainToast).attr("text", "Not logged in");
                app.$.mainToast.show();
            }
        });

        r.add('login', function () {
            app.loading = false;
            app.showLogin = true;
            app.checkLogin = app.checkLoginFunc;
        });

        r.add('transactions', function () {
            app.loadTransactions();
            app.selectedPage = 3;
        });

        r.add('topup', function () {
            if(app.topupmethod) {
                app.loadTopup();
                app.selectedPage = 2;
            } else {
                app.go('/');
            }
        });

        r.add('logout', function () {
            app.logoutFunc();
        });

        // Hash-based routing
        function processHash() {
            if(first=true&&location.hash!=''){
                 var hash = location.hash || '#!';
                 first=false;
                 r.run(hash.slice(2));
            }
            
        }

        window.addEventListener('hashchange', processHash);
        processHash();
    },
    go: function(url) {
        window.location.hash = "#!" + url;
        history.replaceState(null, null, url);
        r.run(url);
    },
    listeners: {
        'login-start': 'checkLoginFunc',
        'open-item-dialog': 'openItemDialog',
        'buy-item': 'buyItem'
    },
    loadApp: function() {
        app.showLogin = false;
        app.showMain = false;
        app.loading = true;
        api.check(function(data) {
            if(data.result) {
                app.loadData();
                app.loadTransactions();
                app.go('/shop');
            } else {
                app.go('/login');
            }
        });
    },
    loadData: function() {
        api.do("user:shop", {}, false, function(data) {
            app.cartPreviewText = cart.previewText;
            app.logged = true;
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
    goShop: function() {
        app.go('/shop');
    },
    goTransactions: function() {
        app.go('/transactions');
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
    goTopup: function() {
        app.go('/topup');
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
                app.go('/');
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
        app.go('/shop/' + detail.data.igroup + '/' + detail.data.id);
        /*
        var data = detail.data;
        this.itemData = data;
        $(this.$.itemDialogTitle).html(data.dispname);
        this.$.itemDialog.open();
        */
    },
    showItem: function(data) {
        shopItemDetail.setup(data);
        app.selectedShopPage = 1;
        /*
        if((this.user.money - cart.priceSum - data.price) < 0) {
            $(this.$.mainToast).attr("text", "Not enough money");
            this.$.mainToast.show();
        } else {
            cart.addItem(data);
            $(this.$.mainToast).attr("text", "Added " + data.dispname + " to cart");
            this.$.mainToast.show();
        }
        */
    },
    buyItem: function(event, detail, sender) {
        this.$.loadingDialog.open();
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/shop:buy",
            data: {
                itemid: detail.data.id
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
            //reload to prevent glitches
            location.reload();
            /*
            app.logged = false;
            app.loadApp();
            login.$.toast1.hide();
            */
        });
    },
    openCart: function() {
        this.$.cartDialog.open();
    },
    updatePreviewText: function() {
        this.cartPreviewText = cart.previewText;
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
