Polymer({
    is: "shop-item",
    ready: function() {
        $(this.$.itemPic).attr('style', this.data.bg);
    },
    openDialog: function(e) {
        this.fire('open-item-dialog', {
            data: this.data
        });
    }
});
