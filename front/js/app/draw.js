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
    circle.setAttribute('fill', fillColor) ;
    circle.setAttribute('stroke', strokeColor);
    circle.setAttribute('stroke-width', strokeWidth);
    svgImg.append(circle);

    // var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // polygon.setAttribute("points", "100,0 50,0 100,100")
    //
    // svgImg.append(polygon);

    var polygon = new Polygon(100,0 ,50,0, 100,100);
    console.log(polygon);
    svgImg.append(polygon.parentNode);
}

function drawPolygon (pointsX, pointsY, fillColor, strokeColor, strokeWidth) {

}

function clear() {

}

function Patch () {

    var pointList = [];
    this.node = document.createElementNS('http://www.w3.org/2000/svg','polygon');

    this.state = 'normal';

    function build (arg) {
        var res = [];
        for (var i=0,l=arg.length;i<l;i++) {
            res.push(arg[i].join(','));
        }
        return res.join(' ');
    }
    this.attribute = function (key,val) {
        if (val === undefined) return node.getAttribute(key);
        this.node.setAttribute(key,val);
    }

    this.getPoint = function (i) {return pointList[i]}

    this.addPoint = function (x, y) {
        pointList.push([x, y])
        this.attribute('points',build(pointList));
    }

    this.setPoints = function (points) {
        this.attribute('points',build(points));
    }

    this.setPoint = function (i,x,y) {
        pointList[i] = [x,y];
        this.attribute('points',build(pointList));
        // this.invalidate.apply(this);
    }

    this.onclick = function () {
        console.log('default onclick patch');
    }

    this.invalidate = function () {
        this.node.setAttribute('class', this.state);
    }



    this.points = function () {
        for (var i=0,l=arguments.length;i<l;i+=2) {
            pointList.push([arguments[i],arguments[i+1]]);
        }
        this.attribute('points',build(pointList));
    }

    // initialize 'points':
    this.points.apply(this,arguments);
}

function Handle(x, y, type) {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    this.radius = 5;

    this.x = x;
    this.y = y;

    this.type = type;

    this.invalidate = function() {

        // var cls = first ? 'first' : 'other';
        // cls = closed ? 'closed' : cls;



        this.node.setAttribute('cx', this.x);
        this.node.setAttribute('cy', this.y);
        this.node.setAttribute('r', this.radius);
        this.node.setAttribute('class', this.type);
    }

    this.invalidate.apply(this);
}

function Path() {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    this.points = [];

    this.closePath = false;

    this.invalidate = function() {
        var  d = this.build(this.points);

        console.log(d);

        this.node.setAttribute('d', d);
    }

    this.setPoints = function (points) {
        this.points = points;
        this.invalidate.apply(this);
    }

    this.build = function (points) {

        res = [];

        for (var i = 1,l = points.length; i < l; i++) {
            res.push(points[i].join(' '));
        }

        if (this.closePath) {
            return 'M ' + points[0].join(' ') + ' L ' + res.join(' L ') + ' Z';
        } else {
          return 'M ' + points[0].join(' ') + ' L ' + res.join(' L ');
        }


    }

}

function Polygon (startX, startY) {
    this.pointsList = [[startX, startY]];

    this.handles = [];
    this.lines = [];

    this.node = document.createElementNS('http://www.w3.org/2000/svg','g');

    this.patch = new Patch();
    this.node.append(this.patch.node);

    // this.patch.onclick = this.onclick;

    this.path = new Path();
    this.node.append(this.path.node);

    var handle = new Handle(startX, startY, 'first');
    this.handles.push(handle);

    this.node.append(handle.node);

    this.onPolygonClick = function (polygon) {
        console.log('default onclick polygon');
    }

    this.attribute = function (key,val) {
        if (val === undefined) return node.getAttribute(key);
        this.node.setAttribute(key,val);
    }

    this.addPoint = function (x, y) {
        this.pointsList.push([x, y]);

        var handle = new Handle(x, y, 'other');
        this.handles.push(handle);

        this.node.append(handle.node);

        this.path.setPoints(this.pointsList);
    }

    this.shouldClose = function (x, y) {
        var x0 = this.pointsList[0][0];
        var y0 = this.pointsList[0][1];

        var dist = Math.sqrt((x0 - x)*(x0 - x) + (y0 - y)*(y0 - y));

        return dist < 8;
    }

    this.onclick = function () {
        this.onPolygonClick(this);
    }

    this.close = function () {
        this.patch.setPoints(this.pointsList);
        this.patch.invalidate();

        this.path.closePath = true;

        this.path.invalidate();

        for (var i in this.handles) {
          this.handles[i].type = 'normal';
          this.handles[i].invalidate();
        }
    }

    this.setSelected = function (selected) {

        var type = 'normal';


        if (selected) {
              type = 'selected';
        }

        this.patch.state = type;
        this.patch.invalidate();

        for (var i in this.handles) {
          this.handles[i].type = type;
          this.handles[i].invalidate();
        }

        console.log(type);

    }




    // Setup event listeners
    // this.patch.node.onclick = this.onclick;
    this.patch.node.addEventListener('click', this.onclick.bind(this), true);
}
