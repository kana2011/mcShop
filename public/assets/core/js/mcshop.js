// custom transformation: scale header's title
addEventListener('core-header-transform', function (e) {
//console.log(e);
var d = e.detail, 
	m = d.height - d.condensedHeight,
	scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75),
	titleStyle = document.querySelector('[mcShop-title]').style;
titleStyle.transform = titleStyle.webkitTransform = 'scale(' + scale + ')';
});
document.querySelector('[mcShop-menu]').onclick = function(e) {
	this.async(function() {
		console.log(this.selected);
		var count = document.querySelectorAll('paper-item[clickable]');
		if(this.selected < count.length){
			document.querySelector('[mcShop-contents]').selected = this.selected;
		}else{
			document.querySelector('[mcShop-menu]').selected = '-1';
		}
	});
};
addEventListener('core-responsive-change', function (e) {
	var d = e.detail;
	if(d.narrow === true){

	}
})