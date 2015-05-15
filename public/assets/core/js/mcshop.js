// custom transformation: scale header's title
addEventListener('core-header-transform', function(e) {
var d = e.detail;
var m = d.height - d.condensedHeight;
var scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75);
var titleStyle = document.querySelector('[mcShop-title]').style;
titleStyle.transform = titleStyle.webkitTransform =
          'scale(' + scale + ') translateZ(0)';
});
