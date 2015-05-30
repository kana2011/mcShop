var login;
Polymer({
    is: 'shop-login',
    ready: function() {
        login = this;
        this.onbuttonclick = this.validate;
        this.title;
    },
    validate: function() {
        login.submit();
        if(!this.username) {
            login.$.toast1.show();
            return;
        }
        if(!this.password) {
            login.$.toast1.show();
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