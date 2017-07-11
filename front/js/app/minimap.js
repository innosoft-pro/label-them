var width;
var height;
var mouseUp = true;
var minimap;
var canvasParent;
var ctx;
var minimapCanvas;
var mainCanvas;

function onMinimapClick(e) {
    var x = (e.pageX - getOffset(minimapCanvas).left);
    var y = (e.pageY - getOffset(minimapCanvas).top);
    var ratioX = x / minimapCanvas.offsetWidth;
    var ratioY = y / minimapCanvas.offsetHeight;
    scrollImage(ratioX, ratioY);
}

function onScroll() {
    var scrollLeftMax = getScrollLeftMax();
    var scrollTopMax = getScrollTopMax();
    var ratioX = canvasParent.scrollLeft() / scrollLeftMax;
    var ratioY = canvasParent.scrollTop() / scrollTopMax;
    drawFOV(ratioX, ratioY);
}

function scrollImage(ratioX, ratioY) {
    var scrollLeftMax = getScrollLeftMax();
    canvasParent.scrollLeft(scrollLeftMax * ratioX);
    var scrollTopMax = getScrollTopMax();
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
    var tempScroll = canvasParent.scrollLeft();
    canvasParent.scrollLeft(10000);
    var scrollMax = canvasParent.scrollLeft();
    canvasParent.scrollLeft(tempScroll);
    return scrollMax;
}

function getScrollTopMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    var tempScroll = canvasParent.scrollTop();
    canvasParent.scrollTop(10000);
    var scrollMax = canvasParent.scrollTop();
    canvasParent.scrollTop(tempScroll);
    return scrollMax;
}

function initMinimap() {
    mainCanvas = $("#main-canvas");
    canvasParent = $("#canvas-parent");
    minimap = document.getElementById("minimap_img");
    minimapCanvas = $("#minimap_canvas")[0];

    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.strokeStyle = "white";

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

    window.addEventListener("resize", onResize);
    canvasParent[0].onscroll = function() {
        onScroll();
    }
}

function onResize() {
    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.strokeStyle = "white";
}

function drawFOV(x, y) {
    var minimapWidth = minimapCanvas.offsetWidth;
    var minimapHeight = minimapCanvas.offsetHeight;
    height = minimapHeight * (canvasParent[0].clientHeight / mainCanvas[0].clientHeight);
    width = minimapWidth * (canvasParent[0].clientWidth / mainCanvas[0].clientWidth);
    x *= minimapWidth - width;
    y *= minimapHeight - height;
    ctx.clearRect(0, 0, minimapWidth, minimapHeight);
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
}
