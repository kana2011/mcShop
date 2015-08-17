var transactions;
Polymer({
    is: "shop-transactions",
    ready: function() {
        transactions = this;
    },
    color: function() {
        for(var i = 0; i < this.transactions.length; i++) {
            if(this.transactions[i].status == 0) {
                var item = $(this.$.table).children()[i];
                $(item).css('background-color', '#FFDFDF');
                this.transactions[i].amount = "Error";
            } else if(this.transactions[i].status == 1) {
                var item = $(this.$.table).children()[i];
                $(item).css('background-color', '#DFFFDF');
            } else if(this.transactions[i].status == 2) {
                var item = $(this.$.table).children()[i];
                $(item).css('background-color', '#FFFFCC');
                this.transactions[i].amount = "Pending";
            }
        }
    }
});
