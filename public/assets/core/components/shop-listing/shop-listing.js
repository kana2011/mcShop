var listing;
Polymer({
    is: "shop-listing",

    behaviors: [
        Polymer.NeonSharedElementAnimatableBehavior
    ],

    ready: function() {
        listing = this;
        this.selectedGroup = 0;
    },

    properties: {
        animationConfig: {
            type: Object,
            value: function() {
                return {
                    'entry': [{
                        name: 'transform-animation',
                        transformFrom: 'translate(0px, calc(-100vh + 192px))',
                        transformTo: 'none',
                        node: this.$.cartpreview
                    }],
                    'exit': [{
                        name: 'transform-animation',
                        transformFrom: 'none',
                        transformTo: 'translate(0px, calc(-100vh + 192px))',
                        node: this.$.cartpreview
                    }]
                }
            }
        }
    },

    _onClick: function(event) {
        var target = this.$.cartpreview;

        this.fire('show-cart', {
            target: target
        });
    }
});
