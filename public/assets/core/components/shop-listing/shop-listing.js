var listing;
Polymer({
    is: "shop-listing",
    ready: function() {
        listing = this;
        this.selectedGroup = 0;
        this.selectedTab = 0;
    },
    tabChanged: function() {
        setTimeout(function() {
            if(listing.selectedTab > listing.selectedGroup) {
                $(listing.$.animatedPages).attr('entry-animation', 'slide-from-right-animation');
                $(listing.$.animatedPages).attr('exit-animation', 'slide-left-animation');
                listing.selectedGroup = listing.selectedTab;
            } else if(listing.selectedTab < listing.selectedGroup) {
                $(listing.$.animatedPages).attr('entry-animation', 'slide-from-left-animation');
                $(listing.$.animatedPages).attr('exit-animation', 'slide-right-animation');
                listing.selectedGroup = listing.selectedTab;
            }
        }, 10);
    }
});
