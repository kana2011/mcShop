var login;
Polymer({
    is: 'shop-login',
    ready: function() {
        login = this;
        this.loadShop();
        this.onbuttonclick = this.validate;
        this.isRegister = 1;
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
    validateRegister: function() {
        setTimeout(function() {
            if(($(login.$.rusername).val().length > 2) &&
                ($(login.$.rpassword).val().length > 2) &&
                ($(login.$.rconfirmpassword).val().length > 2) &&
                ($(login.$.rpassword).val() == $(login.$.rconfirmpassword).val())) {
                $(login.$.registerbutton).attr('disabled', false);
            } else {
                $(login.$.registerbutton).attr('disabled', true);
            }
        }, 10);
    },
    submit: function() {
        this.fire('login-start', {
            username: this.username,
            password: this.password,
            me: this
        });
    }
});
