var svgImg;
var pointsList = [];
var lineWidth = 5;


function initSVG() {
    svgImg = Snap("#svg_img");
}

function svgImgOnClick(event) {
    var point = getPoint(event);
    pointsList.push(point);
    draw();
}


function draw() {
    if (pointsList.length == 1) {
        drawDot(pointsList[0]);
    } else {
        drawPolygon();
    }
}

function drawDot(point) {
    radius = 10;
    svgImg.circle(point.x, point.y, radius)
        .attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5
        });
}

function drawPolygon() {
    svgImg.clear();
    var polygonClosed = isPolygonClosed(pointsList[pointsList.length - 1]);
    if (polygonClosed) {
        pointsList[pointsList.length - 1] = pointsList[0];
    }

    for (var i = 0; i < pointsList.length - 1; i++) {
        drawLine(pointsList[i], pointsList[i + 1]);
    }

    pointsList.forEach(function (point) {
        drawDot(point);
    });

    if (polygonClosed) {
        pointsList = [];
    }
}

function isPolygonClosed(point) {
    var lineW = lineWidth * 3;
    var minX = pointsList[0].x - lineW;
    var maxX = pointsList[0].x + lineW;
    var minY = pointsList[0].y - lineW;
    var maxY = pointsList[0].y + lineW;
    if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
        return true;
    }
    return false;
}

function drawLine(point1, point2) {
    svgImg.line(point1.x, point1.y, point2.x, point2.y)
        .attr({
            fill: 'f44',
            stroke: '#f44242',
            strokeWidth: 5
        });
}

function getX(event) {
    event = event || window.event;
    return x = event.pageX - svgImg.node.getBoundingClientRect().left;
}

function getY(event) {
    var paddingTop = 50;
    event = event || window.event;
    return event.pageY - svgImg.node.getBoundingClientRect().top;
}

function getPoint(event) {
    var point = {
        x: getX(event),
        y: getY(event)
    };
    return point;
}