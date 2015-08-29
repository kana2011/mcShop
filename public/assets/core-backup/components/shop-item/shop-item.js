Polymer({
    is: "shop-item",
    ready: function() {
    },
    openDialog: function(e) {
        this.fire('open-item-dialog', {
            data: this.data
        });
    }
});
