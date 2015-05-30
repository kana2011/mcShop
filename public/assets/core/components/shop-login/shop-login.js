var login;
Polymer({
    is: 'shop-login',
    ready: function() {
        login = this;
        this.onbuttonclick = this.validate;
    },
    validate: function() {
        login.submit();
        if(!this.username) {
            var user = login.$.username;
            user.className = "red";
            return;
        }
        if(!this.password) {
            var pass = this.$.password;
            pass.className = "red";
            return;
        }
        this.submit();
    },
    submit: function() {
        this.fire('login-start', {
            username: this.username,
            password: this.password,
            me: this
        });
    }
});