var cart;
Polymer({
    is: "shop-cart",

    behaviors: [
        Polymer.NeonSharedElementAnimatableBehavior
    ],

    ready: function() {
        cart = this;
    },

    properties: {

        sharedElements: {
            type: Object,
            value: function() {
                return {
                    'hero': this
                }
            }
        },

        animationConfig: {
            type: Object,
            value: function() {
                return {
                    'entry': [{
                        name: 'transform-animation',
                        transformFrom: 'translate(0px, calc(100vh - 192px))',
                        transformTo: 'none',
                        node: this
                    }],
                    'exit': [{
                        name: 'transform-animation',
                        transformFrom: 'none',
                        transformTo: 'translate(0px, calc(100vh - 192px))',
                        node: this
                    }]
                }
            }
        }

    },

    _onClick: function(event) {
        var target = this.$.cartpreview;

        this.sharedElements = {
            'hero': target
        };

        this.fire('show-cart', {
            target: target
        });
    }
});
