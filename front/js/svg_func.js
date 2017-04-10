var messageSpace;
var svgImg;
var pointsList = [];
var lineWidth = 2;
var circleRadius = 5;
var strokeWidth = 5;

function initSvg(ms) {
    messageSpace = document.getElementById('message_space');
    svgImg = Snap("#svg_img");
    initCoordinates(svgImg);
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
        pointsList = [];
        showMessage();
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

function showMessage() {
    $("#message_space").slideDown("slow", 1000);
    setTimeout(function () {
        $("#message_space").slideUp("slow", 1000);
    }, 3000);
}