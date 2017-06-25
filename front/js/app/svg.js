var svgImg;

var polygons = {};

let currentPolygon = null;
let selectedPolygon = null;

let polygonId = 0;

let redoPoints = [];

let currentScale = 1;

function initSvg() {
    svgImg = document.getElementById("svg_img");
    /*global initCoordinates*/
    /*eslint no-undef: "error"*/
    initCoordinates(svgImg);
}

function svgImgCancelPolygon() {
    if (currentPolygon !== null) {
        svgImg.removeChild(currentPolygon.node);
        currentPolygon = null;
    }
}

function svgImgOnClick(event) {

    let point = getPoint(event);

    if (redoPoints.length > 0) {
        redoPoints = [];
    }

    if (currentPolygon !== null) {
        if (currentPolygon.shouldClose(point.x, point.y)) {
            closePolygon();
        } else {
            currentPolygon.addPoint(point.x, point.y);
        }
    } else {
        currentPolygon = new Polygon(point.x, point.y, polygonId);
        currentPolygon.polygonScale = currentScale;


        svgImg.append(currentPolygon.node);
        console.log(currentPolygon.node);

        // resetting classes and parameters values
        resetDOM();
    }
}

function svgImgDeleteSelectedPolygon() {
    if (selectedPolygon !== null) {
        if (selectedPolygon.polygonId in polygons) {
            delete polygons[selectedPolygon.polygonId];
            onPolygonDeleted(selectedPolygon);

            svgImg.removeChild(selectedPolygon.node);

            selectedPolygon = null;
        }
    }
}

function svgScale(scaleFactor) {
    currentScale = currentScale * scaleFactor;

    if (currentPolygon !== null) {
        currentPolygon.scale(scaleFactor);
    }

    for (let key in polygons) {
        polygons[key].scale(scaleFactor);
    }
}

function svgImgOnClickSelect(event) {
    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
        selectedPolygon = null;
    }
}

function undoLastPoint() {
    if (currentPolygon === null) {
        return;
    }

    let lastPointIdx = currentPolygon.pointsList.length - 1;

    if (lastPointIdx <= 0) {
        svgImg.removeChild(currentPolygon.node);
        currentPolygon = null;
    } else {
        let point = currentPolygon.removePoint(lastPointIdx);
        redoPoints.push(point);
        console.log(point);
    }
}

function redoLastPoint() {
    if (currentPolygon === null || redoPoints.length < 1) {
        return;
    }

    let point = redoPoints.pop();

    console.log(point);

    currentPolygon.addPoint(point[0], point[1]);
}

function closePolygon() {
    currentPolygon.close();
    currentPolygon.onPolygonClick = onPolygonClick;
    polygons[polygonId] = currentPolygon;
    polygonId = polygonId + 1;

    // Assigning polygons points to the dataEntity (saving polygons points)
    onPolygonClosed(currentPolygon);

    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
    }

    selectedPolygon = currentPolygon;
    selectedPolygon.setSelected(true);
    showPolygonSelectedMessage();
    onPolygonSelected(selectedPolygon);

    currentPolygon = null;
}

function onPolygonClick(polygon) {

    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
    }


    polygon.setSelected(true);


    selectedPolygon = polygon;

    onPolygonSelected(selectedPolygon);

    showPolygonSelectedMessage();
    // Bring it to top
    svgImg.append(selectedPolygon.node);
}

function showPolygonSelectedMessage() {
    /*global MessageTypeEnum*/
    /*eslint no-undef: "error"*/
    showMessage("Please, characterize the selected object in the right menu.",
        MessageTypeEnum.WARNING);
    setTimeout(function () {
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }, 5000);
}

function resetSVGPolygonData() {
    polygons = {};
    currentPolygon = null;
    selectedPolygon = null;
    polygonId = 0;
}

/*
 * handles resizing of the svg for 1 to 1 mapping between image height and svg layer height
 * accepts Image() as input
 **/
function resizeSvg(img) {
    // make parent div for svg one
    let parent = document.getElementById("canvas-parent");

    let svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the svg layer, specified in bootstrap
    parent.style.minHeight = (img.height + 16) + "px";

    let height = img.height;
    // resizing svg if image width is smaller than the width of the block for the image
    // to avoid redundant markup over empty space in the block
    // and resizing svg if image width is bigger than the width of the block for the image
    // to present the whole svg layer to markup rather then its part
    let width = img.width;

    // modify both svg dimensions
    svg.style.width = width;
    svg.style.height = height;
}
