function init() {
    resize();

}

// loading remote image
var img = new Image();
img.src = "http://cdn.wallpapersafari.com/46/69/ECXFrK.jpg";
var aspectRatio = img.width / img.height;

function drawImg(img) {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    var targetWidth = canvas.height * aspectRatio;
    var targetX = (canvas.width - targetWidth) / 2;

    ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
        targetX, 0, targetWidth, canvas.height); // destination rectangle
}

// handles resizing of the canvas
function resize() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    // make canvas fit parent div
    var parent = document.getElementById("canvas-parent");
    var svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (parent.clientWidth + 28) / aspectRatio + "px";

    var height = parent.clientHeight;
    var width = parent.clientWidth;

    // modify both canvas style and canvas dimension
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    canvas.width = width;
    canvas.height = height;
    svg.style.width = width;
    svg.style.height = height;

    drawImg(img);
}

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);
