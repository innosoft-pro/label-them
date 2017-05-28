var messageSpace;
var svgImg;
var pointsList = [];
var lineWidth = 2;
var circleRadius = 5;
var strokeWidth = 5;

var polygons = [];

var currenPolygon = null;
var selectedPolygon = null;

function initSvg(ms) {
    messageSpace = document.getElementsByClassName('message-space')[0];
    svgImg = document.getElementsByClassName('svg-img')[0];
    initCoordinates(svgImg);
    pointsList = [];
}

function svgImgOnClick(event) {
    var point = getPoint(event);

    if (currenPolygon != null) {
        if (currenPolygon.shouldClose(point.x, point.y)) {
            closePolygon(currenPolygon);
        } else {
            currenPolygon.addPoint(point.x, point.y);
        }
    } else {
        currenPolygon = new Polygon(point.x, point.y);
        svgImg.append(currenPolygon.node);
        console.log(currenPolygon.node);
    }
}

function svgImgOnClickSelect(event) {
    if (selectedPolygon != null) {
        selectedPolygon.setSelected(false);
        selectedPolygon = null;
    }
}

function closePolygon() {
    currenPolygon.close();
    currenPolygon.onPolygonClick = onPolygonClick;
    polygons.push(currenPolygon);

    if (selectedPolygon != null) {
        selectedPolygon.setSelected(false);
    }

    selectedPolygon = currenPolygon;
    selectedPolygon.setSelected(true);
    showPolygonSelectedMessage();

    currenPolygon = null;
}

function onPolygonClick(polygon) {

    if (selectedPolygon != null) {
        selectedPolygon.setSelected(false);
    }


    polygon.setSelected(true);
    selectedPolygon = polygon;
    showPolygonSelectedMessage();
    // Bring it to top
    svgImg.append(selectedPolygon.node);
}

function showPolygonSelectedMessage() {
    showMessage("Please, characterize the selected object in the right menu.",
        MessageTypeEnum.WARNING);
    setTimeout(function () {
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }, 5000);
}
