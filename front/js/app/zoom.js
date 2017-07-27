/**
 * Created by Ayk Badalyan on 04.06.2017.
 */

let canvas;
let svg;
let ratio = 2;

let zoomCount = 0;
let maxZoomCount = 0;

/**
 * Methods initializes canvas and svg object and define max zoom size.
 * */
function initZoom() {
    canvas = document.getElementById("main-canvas");
    svg = document.getElementById("svg_img");
    let size = img.width > img.height ? img.width : img.height;
    maxZoomCount = Math.floor(Math.sqrt(16384 / size)) - 1;
}

/**
 * The methods magnifies the image.
 * */
function zoomPlus() {
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    svg.style.width = svg.style.width.replace("px", "") * ratio;
    svg.style.height = svg.style.height.replace("px", "") * ratio;
    /*global drawImg*/
    /*eslint no-undef: "error"*/
    drawImg(img);
    /*global onZoom*/
    /*eslint no-undef: "error"*/
    onZoom();
}

/**
 * The method reduces the image.
 * */
function zoomMinus() {
    canvas.width = canvas.width / ratio;
    canvas.height = canvas.height / ratio;
    svg.style.width = svg.style.width.replace("px", "") / ratio;
    svg.style.height = svg.style.height.replace("px", "") / ratio;
    /*global drawImg*/
    /*eslint no-undef: "error"*/
    drawImg(img);
    /*global onZoom*/
    /*eslint no-undef: "error"*/
    onZoom();
}