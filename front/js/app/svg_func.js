var messageSpace;
var svgImg;
var pointsList = [];
var lineWidth = 2;
var circleRadius = 5;
var strokeWidth = 5;

function initSvg(ms) {
    messageSpace = document.getElementsByClassName('message-space')[0];
    svgImg = document.getElementsByClassName('svg-img')[0];
    initCoordinates(svgImg);
    pointsList = [];
}

function svgImgOnClick(event) {
    var point = getPoint(event);
    pointsList.push(point);
    draw();
}

function draw() {
    if (pointsList.length === 1) {
        var firstPoint = pointsList[0];
        firstPoint.isFirst = true;
        drawDot(firstPoint);
    } else {
        drawPolygon();
    }
}

function drawPolygon() {
    var polygonClosed = isPolygonClosed(pointsList[pointsList.length - 1]);
    if (polygonClosed) {
        pointsList[pointsList.length - 1] = pointsList[0];
    }

    for (var i = 0; i < pointsList.length - 1; i++) {
        drawLine(pointsList[i], pointsList[i + 1], 'f44', '#f44242', lineWidth);
    }

    pointsList.forEach(function (point) {
        drawDot(point);
    });

    if (polygonClosed) {
        onPolygonClosed(pointsList);
        pointsList = [];
        showPolygonSelectedMessage();
    }
}

function isPolygonClosed(point) {
    var lineW = lineWidth * 5;
    var minX = pointsList[0].x - lineW;
    var maxX = pointsList[0].x + lineW;
    var minY = pointsList[0].y - lineW;
    var maxY = pointsList[0].y + lineW;
    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
}

function drawDot(point) {
    if (point.isFirst) {
        drawCircle(point, circleRadius, "#bada55", "#000000", strokeWidth);
    } else {
        drawCircle(point, circleRadius, "#bada55", "#ffffff", strokeWidth);
    }
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
