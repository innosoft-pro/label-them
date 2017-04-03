function init() {
    resize();

}

// loading remote image
var img = new Image();
img.src = "http://placekitten.com/1296/968";

function drawImg(img) {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    var aspectRatio = img.width / img.height;


    var targetHeight = canvas.width / aspectRatio;
    var targetX = (canvas.height - targetHeight) / 2;

    ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
        targetX, 0, canvas.height, targetHeight); // destination rectangle
}

// handles resizing of the canvas
function resize() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    // make canvas fit parent div
    var parent = document.getElementById("canvas-parent");
    var svg = document.getElementById("svg_img");
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
