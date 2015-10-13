var login;
Polymer({
    is: 'shop-login',
    ready: function() {
        login = this;
        this.loadShop();
        this.onbuttonclick = this.validate;
        this.title;
    },
    loadShop: function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: "api/home:shop"
        }).done(function(data) {
            login.shop = data.shop;
        });
    },
    validate: function() {
        if(!login.username) {
            login.$.username.setAttribute("invalid", true);
            return;
        } else {
            login.$.username.removeAttribute("invalid");
        }
        if(!login.password) {
            login.$.password.setAttribute("invalid", true);
            return;
        } else {
            login.$.password.removeAttribute("invalid");
        }
        login.submit();
    },
    submit: function() {
        this.fire('login-start', {
            username: this.username,
            password: this.password,
            me: this
        });
    }
});
