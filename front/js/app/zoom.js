var canvas;

function initZoom() {
    canvas = document.getElementById("main-canvas");
    default_canvas_width = canvas.width;
}

function zoomPlus() {
    canvas.width = canvas.width * 2;
    canvas.height = canvas.height * 2;
    drawImg(img);
}

function zoomMinus() {
    if (canvas.width == default_canvas_width) return;
    canvas.width = canvas.width / 2;
    canvas.height = canvas.height / 2;
    drawImg(img);
}