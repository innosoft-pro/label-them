function init() {
  resize();

}


// handles resizing of the canvas
function resize() {
  var canvas = document.getElementById('main-canvas');
  var ctx = canvas.getContext('2d');

  // make canvas fit parent div
  var parent = document.getElementById('canvas-parent');

	var height = parent.clientHeight;
  var width  = parent.clientWidth;

  // modify both canvas style and canvas dimension
	canvas.style.height = height+'px';
  canvas.width = width;
  canvas.height = height;

  draw(img);
}

function draw(img) {
  var canvas = document.getElementById('main-canvas');
  var ctx = canvas.getContext("2d");

  var aspectRatio = img.width/img.height;



  var targetWidth = canvas.height*aspectRatio;
  var targetX = (canvas.width - targetWidth)/2;

  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     targetX, 0, targetWidth, canvas.height); // destination rectangle
}


// loading remote image
var img = new Image();
img.src = "http://placekitten.com/1296/968";

window.addEventListener('load', init, false);
window.addEventListener('resize', resize, false);
