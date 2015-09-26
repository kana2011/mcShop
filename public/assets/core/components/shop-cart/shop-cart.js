var cart;
Polymer({
    is: "shop-cart",
    ready: function() {
        cart = this;
        this.itemCount = 0;
        this.priceSum = 0;
        this.items = [];
        this.previewText = "0 items";
    },
    addItem: function(data) {
        this.items.push(data);
        this.priceSum += data.price;
        this.itemCount = this.items.length;
        this.updatePreviewText();
    },
    updatePreviewText: function() {
        if(this.itemCount == 1) {
            this.previewText = "1 item";
        } else {
            this.previewText = this.itemCount + " items";
        }
        app.updatePreviewText();
    }
});
