var transactions;
Polymer({
    is: "shop-transactions",
    ready: function() {
        transactions = this;
    },
    color: function() {
        var sum = 0;
        for(var i = 0; i < this.transactions.length; i++) {
            var j = i + 1;
            if(this.transactions[i].status == 0) {
                var item = $(this.$.table).children()[j];
                $(item).css('background-color', '#FFDFDF');
                this.transactions[i].amount = "Error";
            } else if(this.transactions[i].status == 1) {
                var item = $(this.$.table).children()[j];
                $(item).css('background-color', '#DFFFDF');
                sum += parseInt(this.transactions[i].amount);
            } else if(this.transactions[i].status == 2) {
                var item = $(this.$.table).children()[j];
                $(item).css('background-color', '#FFFFCC');
                this.transactions[i].amount = "Pending";
            }
        }
        this.sum = sum;
        this.sum_created_at = this.transactions[0].created_at;
    }
});
