var canvas;
var svg;
var ratio = 2;

function initZoom() {
    canvas = document.getElementById("main-canvas");
    svg = document.getElementById("svg_img");
    var size = img.width > img.height ? img.width : img.height;
    maxZoomCount = Math.floor(Math.sqrt(16384 / size)) - 1;
}

function zoomPlus() {
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    svg.style.width = svg.style.width.replace("px", "") * ratio;
    svg.style.height = svg.style.height.replace("px", "") * ratio;
    drawImg(img);
}

function zoomMinus() {
    canvas.width = canvas.width / ratio;
    canvas.height = canvas.height / ratio;
    svg.style.width = svg.style.width.replace("px", "") / ratio;
    svg.style.height = svg.style.height.replace("px", "") / ratio;
    drawImg(img);
}