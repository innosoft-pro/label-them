var width;
var height;
var mu = true;
var minimap;
var canvasParent;
var mainImage;
var ctx;
var minimapCanvas;
var mainCanvas;

function onMinimapClick(e) {
    var x = (e.pageX - getOffset(minimapCanvas[0]).left);
    var y = (e.pageY - getOffset(minimapCanvas[0]).top);
    var ratioX = x / minimapCanvas[0].offsetWidth;
    var ratioY = y / minimapCanvas[0].offsetHeight;
    scrollImage(ratioX, ratioY);
    drawFOV(ratioX, ratioY);
}

function onScrollMainCanvas(){

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
    canvasParent.scrollLeft(10000);
    var scrollMax = canvasParent.scrollLeft();
    canvasParent.scrollLeft(0);
    return scrollMax;
}

function getScrollTopMax() {
    //scrollMax() is available only on gecko. Setting unreasonably high value returns maximum scroll value
    canvasParent.scrollTop(10000);
    var scrollMax = canvasParent.scrollTop();
    canvasParent.scrollTop(0);
    return scrollMax;
}

function initMinimap() {
    mainCanvas = $("#main-canvas");
    canvasParent = $("#canvas-parent");
    minimap = document.getElementById("minimap_img");
    mainImage = document.getElementById("img_url");
    minimapCanvas = document.getElementById("minimap_canvas");
    minimapCanvas.width = minimap.width;
    minimapCanvas.height = minimap.height;
    ctx = minimapCanvas.getContext("2d");
    ctx.strokeStyle = "white";

    minimapCanvas.addEventListener("mousedown", function (e) {
        mu = false;
        onMinimapClick(e);
        e.preventDefault();
        e.stopPropagation()
    }, false);
    minimapCanvas.addEventListener("mousemove", function (e) {
        mu || onMinimapClick(e)
    }, false);
    minimapCanvas.addEventListener("mouseup", function (e) {
        mu = true
    }, false);

    minimapCanvas.onLoad = function () {
        width = this.width;
        height = this.height;
    }
    minimapCanvas.onLoad();
    minimapCanvas = $("#minimap_canvas");
    drawFOV(0.01, 0.01);
}

function drawFOV(x, y) {
    minimapWidth = minimapCanvas[0].offsetWidth;
    minimapHeight = minimapCanvas[0].offsetHeight;
    console.log(minimapWidth + "::" + minimapHeight);
    height = minimapHeight * (canvasParent[0].clientHeight / mainCanvas[0].clientHeight);
    width = minimapWidth * (canvasParent[0].clientWidth / mainCanvas[0].clientWidth);
    x *= minimapWidth - width;
    y *= minimapHeight - height;
    ctx.clearRect(0, 0, minimapWidth, minimapHeight);
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
}
