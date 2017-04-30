function initCanvas() {

    img.onload = function () {
       aspectRatio = img.width / img.height;
       resizeSupportingOneToOneMapping();
       window.addEventListener("resize", resizeSupportingOneToOneMapping, false);
    }

    // node = document.getElementById('img_url');
    var url = document.getElementById("img_url").innerText;
    img.src = url;//"https://actingmylife.files.wordpress.com/2015/06/img_1730.jpg";


}

// loading remote image
var img = new Image();

// WARNING! GOVNOKOD AHEAD!!!
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

// handles resizing of the canvas for 1 to 1 mapping between image height and canvas height
function resizeSupportingOneToOneMapping() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    // make canvas fit parent div
    var parent = document.getElementById("canvas-parent");
    var svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (img.height + 28) + "px";

    var height = parent.clientHeight;
    var width = parent.clientWidth;

    if(width > img.width) {
        width = img.width;
    }

    // modify both canvas style and canvas dimension
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    canvas.width = width;
    canvas.height = height;
    svg.style.width = width;
    svg.style.height = height;

    if(canvas.width < img.width) {
            showMessage(
                "Image cannot fit the screen in width. " +
                "Only left part of the image that fits the screen is displayed! " +
                "Please, markup the visible part of the image displayed below using the " +
                "tools from the block on the left or skip this image.",
                MessageTypeEnum.DANGER);
    }

    drawImgSupportingOneToOneMapping(img);
}

function drawImgSupportingOneToOneMapping(img) {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, canvas.width, img.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
}

// function CanvasReadyFn( jQuery ) {
//     // initCanvas();
// }
//
// $( document ).ready(CanvasReadyFn);

// window.addEventListener("load", init, false);
// window.addEventListener("resize", resize, false);
