let width;
let height;
let mouseUp = true;
let minimap;
let canvasParent;
let ctx;
let minimapCanvas;
let mainCanvasBlock;

function onMinimapClick(e) {
    let x = (e.pageX - getOffset(minimapCanvas).left);
    let y = (e.pageY - getOffset(minimapCanvas).top);
    let ratioX = x / minimapCanvas.offsetWidth;
    let ratioY = y / minimapCanvas.offsetHeight;
    scrollImage(ratioX, ratioY);
}

function onScroll() {
    let scrollLeftMax = getScrollLeftMax();
    let scrollTopMax = getScrollTopMax();
    let ratioX = canvasParent.scrollLeft() / scrollLeftMax;
    let ratioY = canvasParent.scrollTop() / scrollTopMax;
    drawFOV(ratioX, ratioY);
}

function scrollImage(ratioX, ratioY) {
    let scrollLeftMax = getScrollLeftMax();
    canvasParent.scrollLeft(scrollLeftMax * ratioX);
    let scrollTopMax = getScrollTopMax();
    canvasParent.scrollTop(scrollTopMax * ratioY);
}

function getOffset(elem) {
    elem = elem.getBoundingClientRect();
    return {
        left: elem.left + window.scrollX,
        top: elem.top + window.scrollY
    }
}

function getScrollLeftMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    let tempScroll = canvasParent.scrollLeft();
    canvasParent.scrollLeft(10000);
    let scrollMax = canvasParent.scrollLeft();
    canvasParent.scrollLeft(tempScroll);
    return scrollMax;
}

function getScrollTopMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    let tempScroll = canvasParent.scrollTop();
    canvasParent.scrollTop(10000);
    let scrollMax = canvasParent.scrollTop();
    canvasParent.scrollTop(tempScroll);
    return scrollMax;
}

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
        e.stopPropagation()
    }, false);
    minimapCanvas.addEventListener("mousemove", function (e) {
        mouseUp || onMinimapClick(e)
    }, false);
    minimapCanvas.addEventListener("mouseup", function (e) {
        mouseUp = true
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

function redrawMinimapOnResize() {
    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    onScroll();
}

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
