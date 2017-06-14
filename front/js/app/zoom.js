var canvas;
var svg;
var default_canvas_width;

function initZoom() {
    canvas = document.getElementById("main-canvas");
    svg = document.getElementById("svg_img");
    default_canvas_width = canvas.width;
}

function zoomPlus() {
    canvas.width = canvas.width * 2;
    canvas.height = canvas.height * 2;
    svg.style.width = svg.style.width.replace("px", "") * 2;
    svg.style.height = svg.style.height.replace("px", "") * 2;
    drawImg(img);
}

function zoomMinus() {
    if (canvas.width === default_canvas_width) return;
    canvas.width = canvas.width / 2;
    canvas.height = canvas.height / 2;
    svg.style.width = svg.style.width.replace("px", "") / 2;
    svg.style.height = svg.style.height.replace("px", "") / 2;
    drawImg(img);
}