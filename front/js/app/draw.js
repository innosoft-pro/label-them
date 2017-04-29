function drawLine(point1, point2, fillColor, strokeColor, strokeWidth) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', point1.x);
    line.setAttribute('y1', point1.y);
    line.setAttribute('x2', point2.x);
    line.setAttribute('y2', point2.y);
    line.setAttribute('fill', fillColor);
    line.setAttribute('stroke', strokeColor);
    line.setAttribute('stroke-width', strokeWidth);
    svgImg.append(line);
}

function drawCircle(point, radius, fillColor, strokeColor, strokeWidth) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', fillColor);
    circle.setAttribute('stroke', strokeColor);
    circle.setAttribute('stroke-width', strokeWidth);
    svgImg.append(circle);
}