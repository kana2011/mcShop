Polymer({is: "shop-main"}, {
    ready: function() {
        
    },
    loading: true
});

// custom transformation: scale header's title
addEventListener('paper-header-transform', function (e) {
//console.log(e);
var d = e.detail, 
	m = d.height - d.condensedHeight,
	scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75),
	titleStyle = document.querySelector('[mcShop-title]').style;
	titleStyle.transform = titleStyle.webkitTransform = 'scale(' + scale + ') translateZ(0px)';
	titleStyle.transformOrigin = titleStyle.webkitTransformOrigin = 'left';
});
document.querySelector('[mcShop-menu]').onclick = function(e) {
	this.async(function() {
		console.log(this.selected);
		var count = document.querySelectorAll('paper-item[clickable]');
		document.querySelector('[mcShop-contents]').selected = this.selected;
	});
};
addEventListener('core-responsive-change', function (e) {
	var d = e.detail;
	if(d.narrow === true){

	}
})