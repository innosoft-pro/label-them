var canvas;
var svg;
var defaultCanvasWidth;
var maxWidth;
var zoomCount = 4;
var ratio = 2;

function initZoom() {
    canvas = document.getElementById("main-canvas");
    svg = document.getElementById("svg_img");
    defaultCanvasWidth = canvas.width;
    maxWidth = defaultCanvasWidth * ratio * ratio * zoomCount;
}

function zoomPlus() {
    if (canvas.width === maxWidth) return;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    svg.style.width = svg.style.width.replace("px", "") * ratio;
    svg.style.height = svg.style.height.replace("px", "") * ratio;
    drawImg(img);
}

function zoomMinus() {
    if (canvas.width === defaultCanvasWidth) return;
    canvas.width = canvas.width / ratio;
    canvas.height = canvas.height / ratio;
    svg.style.width = svg.style.width.replace("px", "") / ratio;
    svg.style.height = svg.style.height.replace("px", "") / ratio;
    drawImg(img);
}