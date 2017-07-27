/**
 * Created by Ayk Badalyan on 22.05.2017.
 */

var mainCanvas;
var step = 10;
var defaultBrightness = 100;
var maxBrightness = 500;
var minBrightness = 10;

/**
 * Initializes the canvas to change the brightness of the image.
 */
function initBrightness() {
    mainCanvas = document.getElementById("main-canvas");
}

/**
 * Refreshes the brightness of the picture.
 * */
function updateBrightness() {
    mainCanvas.style["-webkit-filter"] = "brightness(" + defaultBrightness + "%)";
}

/**
 * Increases the brightness of the picture. Max value is 500%.
 * */
function plusBrightness() {
    if (defaultBrightness >= maxBrightness) {
        return;
    }
    defaultBrightness += step;
    updateBrightness();
}

/**
 * Reduces the brightness of the picture. Min value is 10%.
 * */
function minusBrightness() {
    if (defaultBrightness <= minBrightness) {
        return;
    }
    defaultBrightness -= step;
    updateBrightness();
}