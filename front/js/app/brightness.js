var mainCanvas;
var step = 10;
var defaultBrightness = 100;
var maxBrightness = 500;
var minBrightness = 10;

function initBrightness() {
    mainCanvas = document.getElementById("main-canvas");
}

function updateBrightness() {
    mainCanvas.style["-webkit-filter"] = "brightness(" + defaultBrightness + "%)";
}

function plusBrightness() {
    if (defaultBrightness >= maxBrightness) return;
    defaultBrightness += step;
    updateBrightness();
}

function minusBrightness() {
    if (defaultBrightness <= minBrightness) return;
    defaultBrightness -= step;
    updateBrightness();
}