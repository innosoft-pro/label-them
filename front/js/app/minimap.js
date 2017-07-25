/**
 * @typedef {object} MouseEvent
 * @typedef {object} HTMLElement
 */

let width;
let height;
let mouseUp = true;
let minimap;
let canvasParent;
let ctx;
let minimapCanvas;
let mainCanvasBlock;

/**
 * Draw a rect on the minimap representing visible area of the main canvas.
 * @event drawFOV
 * @param {number} x - x value of top left point of the rect in percents to the full width of the main canvas.
 * @param {number} y - y value of top left point of the rect in percents to the full height of the main canvas.
 */
function drawFOV(x, y) {
    let minimapWidth = minimapCanvas.offsetWidth;
    let minimapHeight = minimapCanvas.offsetHeight;
    height = minimapHeight * (canvasParent[0].clientHeight / mainCanvasBlock[0].clientHeight);
    width = minimapWidth * (canvasParent[0].clientWidth / mainCanvasBlock[0].clientWidth);
    x *= minimapWidth - width;
    y *= minimapHeight - height;
    ctx.clearRect(0, 0, minimapWidth, minimapHeight);
    ctx.strokeRect(x, y, width, height);
}

/**
 * Scroll the main canvas.
 * @param {number} ratioX - Ratio of a desired horizontal scroll value to a maximum horizontal scroll value.
 * @param {number} ratioY - Ratio of a desired vertical scroll value to a maximum vertical scroll value.
 */
function scrollImage(ratioX, ratioY) {
    let scrollLeftMax = getScrollLeftMax();
    canvasParent.scrollLeft(scrollLeftMax * ratioX);
    let scrollTopMax = getScrollTopMax();
    canvasParent.scrollTop(scrollTopMax * ratioY);
}

/**
 * Event on minimap click triggering the main canvas scrolling
 * @param {MouseEvent} e - Click event
 */
function onMinimapClick(e) {
    let x = (e.pageX - getOffset(minimapCanvas).left);
    let y = (e.pageY - getOffset(minimapCanvas).top);
    let ratioX = x / minimapCanvas.offsetWidth;
    let ratioY = y / minimapCanvas.offsetHeight;
    scrollImage(ratioX, ratioY);
}

/**
 * Event on the main canvas scrolling triggering minimap redraw
 * @event onScroll
 * @fires drawFOV
 */
function onScroll() {
    let scrollLeftMax = getScrollLeftMax();
    let scrollTopMax = getScrollTopMax();
    let ratioX = canvasParent.scrollLeft() / scrollLeftMax;
    let ratioY = canvasParent.scrollTop() / scrollTopMax;
    drawFOV(ratioX, ratioY);
}

/**
 * Returns the offset of the element
 * @param {HTMLElement} elem - Element which offset is returned
 * @return {offset} offset - Offset of the elem
 */
function getOffset(elem) {
    elem = elem.getBoundingClientRect();
    return {
        left: elem.left + window.scrollX,
        top: elem.top + window.scrollY
    };
}

/**
 * Returns the maximum value of scrollLeft() of the main canvas
 * @return {number} scrollMax - a maximum value of mainCanvas.scrollLeft()
 */
function getScrollLeftMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    let tempScroll = canvasParent.scrollLeft();
    canvasParent.scrollLeft(10000);
    let scrollMax = canvasParent.scrollLeft();
    canvasParent.scrollLeft(tempScroll);
    return scrollMax;
}

/**
 * Returns the maximum value of scrollTop() of the main canvas
 * @return {number} scrollMax - a maximum value of mainCanvas.scrollTop()
 */
function getScrollTopMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    let tempScroll = canvasParent.scrollTop();
    canvasParent.scrollTop(10000);
    let scrollMax = canvasParent.scrollTop();
    canvasParent.scrollTop(tempScroll);
    return scrollMax;
}

/**
 * Initialize the minimap. Assign all the required values.
 */
function initMinimap() {
    mainCanvasBlock = $("#main-canvas");
    canvasParent = $("#canvas-parent");
    minimap = document.getElementById("minimap_img");
    minimapCanvas = $("#minimap_canvas")[0];

    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";

    minimapCanvas.addEventListener("mousedown", function (e) {
        mouseUp = false;
        onMinimapClick(e);
        e.preventDefault();
        e.stopPropagation();
    }, false);
    minimapCanvas.addEventListener("mousemove", function (e) {
        mouseUp || onMinimapClick(e);
    }, false);
    minimapCanvas.addEventListener("mouseup", function (e) {
        mouseUp = true;
    }, false);

    minimapCanvas.onmouseleave = function () {
        mouseUp = true;
    };
    canvasParent[0].onscroll = function () {
        onScroll();
    };
    canvasParent[0].addEventListener("onload", function () {
        drawFOV(0, 0);
    });
}

/**
 * Redraw a rect on the minimap on window resize based on new values of the scroll
 * @fires onScroll
 */
function redrawMinimapOnResize() {
    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    onScroll();
}
