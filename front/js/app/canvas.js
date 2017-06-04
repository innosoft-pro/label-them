function drawImg(img) {
    let canvas = document.getElementById("main-canvas");
    let ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, canvas.width, img.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
}

/*
 * handles resizing of the canvas for 1 to 1 mapping between image height and canvas height
 * accepts Image() as input
 * returns "Not the full image will be shown" string if canvas.width < img.width
 **/
function resizeCanvas(img) {
    let canvas = document.getElementById("main-canvas");

    // make canvas fit parent div
    let parent = document.getElementById("canvas-parent");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (img.height + 28) + "px";

    let height = parent.clientHeight;
    let width = parent.clientWidth;

    // resizing canvas if image width is smaller than the width of the block for the image
    // to avoid redundant markup over empty space in the block
    if (width > img.width) {
        width = img.width;
    }

    // modify both canvas style and canvas dimension
    canvas.width = width;
    canvas.height = height;

    drawImg(img);

    if (canvas.width < img.width) { // Notify the user that not the full image will be shown
        return "Not the full image will be shown";
    }
}