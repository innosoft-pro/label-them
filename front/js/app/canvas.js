function initCanvas() {

    img.onload = function () {
        aspectRatio = img.width / img.height;
        resize();
        window.addEventListener("resize", resize, false);
    };

    var url = document.getElementById("img_url").innerText;
    img.src = url;


}

// loading remote image
var img = new Image();

// WARNING! GOVNOKOD AHEAD!!!
var aspectRatio = img.width / img.height;


function drawImg(img) {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, canvas.width, img.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
}

// handles resizing of the canvas for 1 to 1 mapping between image height and canvas height
function resize() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    // make canvas fit parent div
    var parent = document.getElementById("canvas-parent");
    var svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (img.height + 28) + "px";

    var height = parent.clientHeight;
    var width = parent.clientWidth;

    // resizing canvas if image width is smaller than the width of the block for the image
    // to avoid redundant markup over empty space in the block
    if (width > img.width) {
        width = img.width;
    }

    // modify both canvas style and canvas dimension
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    canvas.width = width;
    canvas.height = height;
    svg.style.width = width;
    svg.style.height = height;

    if (canvas.width < img.width) { // Notify the user that not the full image will be shown
        showMessage(
            "Image cannot fit the screen in width. " +
            "Only left part of the image that fits the screen is displayed! " +
            "Please, markup the visible part of the image displayed below using the " +
            "tools from the block on the left or skip this image.",
            MessageTypeEnum.DANGER);
    } else { // Display the instructions for the user
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }

    drawImg(img);
}