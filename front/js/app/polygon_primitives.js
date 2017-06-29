function Patch() {
    let pointList = [];

    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    this.state = "normal";

    function build(arg) {
        let res = [];
        for (let i = 0, l = arg.length; i < l; i++) {
            res.push(arg[i].join(","));
        }
        return res.join(" ");
    }

    this.attribute = function (key, val) {
        if (val === undefined) return node.getAttribute(key);
        this.node.setAttribute(key, val);
    };

    this.getPoint = function (i) {
        return pointList[i]
    };

    this.addPoint = function (x, y) {
        pointList.push([x, y]);
        this.attribute("points", build(pointList));
    };

    this.setPoints = function (points) {
        this.attribute("points", build(points));
    };

    this.setPoint = function (i, x, y) {
        pointList[i] = [x, y];
        this.attribute("points", build(pointList));
        // this.invalidate.apply(this);
    };

    this.onclick = function () {
        console.log("default onclick patch");
    };

    this.invalidate = function () {
        this.node.setAttribute("class", this.state);
    };


    this.points = function () {
        for (let i = 0, l = arguments.length; i < l; i += 2) {
            pointList.push([arguments[i], arguments[i + 1]]);
        }
        this.attribute("points", build(pointList));
    };

    // initialize "points":
    this.points.apply(this, arguments);
}

function Handle(x, y, type) {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    this.radius = 5;

    this.x = x;
    this.y = y;

    this.type = type;

    this.invalidate = function () {
        this.node.setAttribute("cx", this.x);
        this.node.setAttribute("cy", this.y);
        this.node.setAttribute("r", this.radius);
        this.node.setAttribute("class", this.type);
    };


    this.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };

    this.invalidate.apply(this);
}

function Path() {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "path");

    this.points = [];

    this.closePath = false;

    this.invalidate = function () {
        let d = this.build(this.points);

        console.log(d);

        this.node.setAttribute("d", d);
    };

    this.setPoints = function (points) {
        this.points = points;
        this.invalidate.apply(this);
    };

    this.clear = function () {
        this.points = [];
        this.closePath = false;

        this.node.setAttribute("d", "");
    };

    this.build = function (points) {

        let res = [];

        for (let i = 1, l = points.length; i < l; i++) {
            res.push(points[i].join(" "));
        }

        if (this.closePath) {
            return "M " + points[0].join(" ") + " L " + res.join(" L ") + " Z";
        } else {
            return "M " + points[0].join(" ") + " L " + res.join(" L ");
        }


    }

}

function Polygon(startX, startY, polygonId) {
    this.pointsList = [[startX, startY]];

    this.handles = [];

    this.node = document.createElementNS("http://www.w3.org/2000/svg", "g");

    this.patch = new Patch();
    this.node.append(this.patch.node);

    // this.patch.onclick = this.onclick;

    this.path = new Path();
    this.node.append(this.path.node);

    let handle = new Handle(startX, startY, "first");
    this.handles.push(handle);

    this.node.append(handle.node);

    this.polygonId = polygonId;

    this.polygonScale = 1;

    this.onPolygonClick = function (polygon) {
        console.log("default onclick polygon");
    };

    this.attribute = function (key, val) {
        if (val === undefined) return this.node.getAttribute(key); // FIXME: Does this node need to be changed to this.node?
        this.node.setAttribute(key, val);
    };

    this.addPoint = function (x, y) {
        this.pointsList.push([x, y]);

        let handle = new Handle(x, y, "other");
        this.handles.push(handle);

        this.node.append(handle.node);

        this.path.setPoints(this.pointsList);
    };

    this.removePoint = function (ind) {
        let point = (this.pointsList.splice(ind, 1))[0];

        let handle = this.handles[ind];
        this.node.removeChild(handle.node);

        this.handles.splice(ind, 1);

        if (this.pointsList.length > 1) {
            this.path.setPoints(this.pointsList);
        } else {
            this.path.clear();
        }

        return point;
    };

    this.shouldClose = function (x, y) {
        let x0 = this.pointsList[0][0];
        let y0 = this.pointsList[0][1];

        let dist = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));

        return dist < 8;
    };

    this.onclick = function () {
        this.onPolygonClick(this);
    };

    this.close = function () {
        this.patch.setPoints(this.pointsList);
        this.patch.invalidate();

        this.path.closePath = true;
        this.path.invalidate();

        for (let i in this.handles) {
            this.handles[i].type = "normal";
            this.handles[i].invalidate();
        }
    };

    this.setSelected = function (selected) {

        let type = "normal";

        if (selected) {
            type = "selected";
        }

        this.patch.state = type;
        this.patch.invalidate();

        for (let i in this.handles) {
            this.handles[i].type = type;
            this.handles[i].invalidate();
        }

        console.log(type);

    };

    this.scale = function (scaleFactor) {

        this.polygonScale = this.polygonScale * scaleFactor;
        this.pointsList = this.scalePoints.apply(this, [scaleFactor]);

        for (let i = 0; i < this.pointsList.length; i++) {
            this.handles[i].setPoint(this.pointsList[i][0], this.pointsList[i][1]);
            this.handles[i].invalidate();

            this.path.setPoints(this.pointsList);

            if (this.path.closePath) {
                this.patch.setPoints(this.pointsList);
                this.patch.invalidate();
            }

        }
    };

    this.resetScale = function () {
        this.scale.apply(this, [1 / this.polygonScale])
    };

    this.scalePoints = function (scaleFactor) {
        // Create a deep copy of pointsList. If you know a better way, let me know
        let scaledPts = JSON.parse(JSON.stringify(this.pointsList));

        for (let i = 0; i < scaledPts.length; i++) {
            let pt = scaledPts[i];
            pt[0] = pt[0] * scaleFactor;
            pt[1] = pt[1] * scaleFactor;
        }

        return scaledPts;
    };

    this.unscaledPoints = function () {
        return this.scalePoints.apply(this, [1 / this.polygonScale]);
    };

    // Setup event listeners
    this.patch.node.addEventListener("click", this.onclick.bind(this), true);
}
