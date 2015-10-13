var shopItemDetail;
Polymer({
    is: "shop-item-detail",
    ready: function() {
        shopItemDetail = this;
    },
    nextState: function() {
        if(this.state == 0) {
            this.state = 1;
            $(this.$.buyButton).addClass("hidden");
            $(this.$.confirmButton).removeClass("hidden");
        } else if(this.state == 1) {
            $(this.$.confirmButton).addClass("hidden");
            $(this.$.boughtText).removeClass("hidden");
            this.fire('buy-item', {
                data: this.data
            });
        }
    },
    setup: function(data) {
        this.data = data;
        this.state = 0;
        $(this.$.buyButton).removeClass("hidden");
        $(this.$.confirmButton).addClass("hidden");
        $(this.$.boughtText).addClass("hidden");
        if(data.icomment == null) {
            data.icomment = "-";
        }
        $(this.$.itemPic).attr('style', this.data.bg);
    },
    closeDialog: function(e) {
        app.selectedShopPage = 0;
        app.go('/shop');
    }
});
