function drawLine(point1, point2, fillColor, strokeColor, strokeWidth) {
    svgImg.line(point1.x, point1.y, point2.x, point2.y)
        .attr({
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeWidth
        });
}

function drawCircle(point, radius, fillColor, strokeColor, strokeWidth) {
    svgImg.circle(point.x, point.y, radius)
        .attr({
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeWidth
        });
}
