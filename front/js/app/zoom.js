var canvas;
var svg;
var ratio = 2;

function initZoom() {
    canvas = document.getElementById("main-canvas");
    svg = document.getElementById("svg_img");
}

function zoomPlus() {
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    svg.style.width = svg.style.width.replace("px", "") * ratio;
    svg.style.height = svg.style.height.replace("px", "") * ratio;
    /*global drawImg*/
    /*eslint no-undef: "error"*/
    drawImg(img);
}

function zoomMinus() {
    canvas.width = canvas.width / ratio;
    canvas.height = canvas.height / ratio;
    svg.style.width = svg.style.width.replace("px", "") / ratio;
    svg.style.height = svg.style.height.replace("px", "") / ratio;
    /*global drawImg*/
    /*eslint no-undef: "error"*/
    drawImg(img);
}