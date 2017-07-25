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

    this.updateColor = function (color) {
        this.node.style.fill = color;
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

    this.id = -1;

    this.shouldDrag = false;

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

    this.onMouseDown = function (evt) {
        this.shouldDrag = true;
        this.onHandlePressed(this);
    };

    this.onMouseUp = function (evt) {
        this.shouldDrag = false;
        this.onHandleReleased();
    };

    this.onHandlePressed = function (handle) {
    };

    this.onHandleReleased = function () {
    };

    this.dragHandle = function (dx, dy) {
        this.x = this.x + dx;
        this.y = this.y + dy;

        this.invalidate();
    };

    this.onHandleDrag = function (handle) {
        console.log("Dragging handle with id: " + handle.id);
    };

    this.onMouseMove = function (evt) {
        if (this.shouldDrag) {
            point = getPoint(evt);
            let dx = point.x - this.x;
            let dy = point.y - this.y;
            this.dragHandle(dx, dy);
            this.onHandleDrag(this);
        }
    };

    // Setup events for drag and resize
    this.setupEventListeners = function (selected) {
        if (selected) {
            this.node.addEventListener("mousedown", this.onMouseDownRef, true);
            this.node.addEventListener("mouseup", this.onMouseUpRef, true);
        } else {
            this.node.removeEventListener("mousedown", this.onMouseDownRef, true);
            this.node.removeEventListener("mouseup", this.onMouseUpRef, true);
            this.shouldDrag = false;
        }
    };

    this.invalidate.apply(this);

    // Ref Magic
    this.onMouseDownRef = this.onMouseDown.bind(this);
    this.onMouseUpRef = this.onMouseUp.bind(this);
}


function Label(x, y, text) {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.x = x;
    this.y = y;
    this.node.setAttribute('x', x);
    this.node.setAttribute('y', y);
    this.node.setAttribute('fill', '#FFFFFF');
    this.node.textContent = text;

    this.scale = function(scaleFactor) {
      this.reposition(this.x * scaleFactor, this.y * scaleFactor);
    }

    this.reposition = function(x, y) {
      this.x = x;
      this.y = y;
      this.node.setAttribute('x', this.x);
      this.node.setAttribute('y', this.y);
    }

    this.setText = function(text) {
      this.node.textContent = text;
    }
}

function Path() {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "path");

    this.points = [];

    this.closePath = false;

    this.invalidate = function () {
        let d = this.build(this.points);
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

function Polygon(startX, startY, polygonId, type = "poly") {
    this.pointsList = [[startX, startY]];

    this.handles = [];

    this.node = document.createElementNS("http://www.w3.org/2000/svg", "g");

    this.patch = new Patch();
    this.node.append(this.patch.node);

    this.path = new Path();
    this.node.append(this.path.node);

    this.polygonId = polygonId;
    this.polygonScale = 1;

    this.activeHandle = null;

    this.type = type;

    this.onPolygonClick = function (polygon) {
        console.log("default onclick polygon");
    };

    this.onPolygonModified = function (polygon) {
        console.log("default on polygon modified");
    };

    this.attribute = function (key, val) {
        if (val === undefined) return this.node.getAttribute(key); // FIXME: Does this node need to be changed to this.node?
        this.node.setAttribute(key, val);
    };

    this.addPoint = function (x, y) {
        this.pointsList.push([x, y]);
        this.setupHandle(x, y, "other", true);
        this.path.setPoints(this.pointsList);
    };

    this.setupHandle = function (x, y, tag, allowDrag) {
        let handle = new Handle(x, y, tag);

        handle.id = this.pointsList.length - 1;
        handle.onHandlePressed = this.onHPrRef;
        handle.onHandleReleased = this.onHRelRef;

        this.handles.push(handle);
        this.node.append(handle.node);

        if (allowDrag) {
            handle.setupEventListeners(true);
        }
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

    this.onHandleDrag = function (handle, dx, dy) {
        this.pointsList[handle.id] = [handle.x + dx, handle.y + dy];
        this.path.setPoints(this.pointsList);

        if (this.path.closePath) {
            this.patch.setPoints(this.pointsList);
            this.patch.invalidate();
        }

        handle.x = this.pointsList[handle.id][0];
        handle.y = this.pointsList[handle.id][1];

        handle.invalidate.apply(handle);

        this.onPolygonModified(this);

        if (this.label) {
            let cnt = this.centroid();
            this.label.reposition(cnt[0], cnt[1]);
        }
    };

    this.onHandlePressed = function (handle) {
        this.activeHandle = handle;
        // console.log("Handle pressed: " + handle.id);
    };

    this.onHandleReleased = function () {
        this.activeHandle = null;
        // console.log("Handle released");
    };

    this.onDrag = function (evt) {
        let point = getPoint(evt);

        if (this.type === "poly" && this.activeHandle !== null) {
            this.activeHandle.x = point.x;
            this.activeHandle.y = point.y;

            this.onHandleDrag(this.activeHandle, point.x - this.activeHandle.x, point.y - this.activeHandle.y);
        } else if (type === "rect") {
            // this.setupHandle(point.x, point.y, "other", false);
        }
    };

    this.shouldClose = function (x, y) {
        let x0 = this.pointsList[0][0];
        let y0 = this.pointsList[0][1];

        let dist = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));

        return dist < 8;
    };

    this.onclick = function (event) {
        console.log("Polygon on click");
        event.stopPropagation();
        this.onPolygonClick(this);
    };

    this.close = function () {
        this.patch.setPoints(this.pointsList);
        this.patch.invalidate();

        this.path.closePath = true;
        this.path.invalidate();

        // let bbox = this.node.getBBox();

        let cnt = this.centroid();

        // this.label = new Label(bbox.x + bbox.width/2, bbox.y + bbox.height/2, "");
        this.label = new Label(cnt[0], cnt[1], "");
        this.node.append(this.label.node);

        for (let i in this.handles) {
            this.handles[i].type = "normal";
            this.handles[i].invalidate();
        }
    };

    this.centroid = function () {
        let x = 0.0;
        let y = 0.0;

        for (let i in this.pointsList) {
            x = x + this.pointsList[i][0];
            y = y + this.pointsList[i][1];
        }

        x = x / this.pointsList.length;
        y = y / this.pointsList.length;

        return [x, y];
    }

    this.setSelected = function (selected) {

        let type = "normal";
        let svgParent = this.node.parentNode;

        if (selected) {
            type = "selected";
        }

        this.patch.state = type;
        this.patch.invalidate();

        for (let i in this.handles) {

            this.handles[i].id = i;
            this.handles[i].setupEventListeners(selected);

            this.handles[i].type = type;
            this.handles[i].invalidate();
        }
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

        if (this.label) {
            this.label.scale(scaleFactor);
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

    this.setDragEnabled = function (enabled) {
        let svgParent = this.node.parentNode;

        if (enabled) {
            svgParent.addEventListener("mousemove", this.onDragRef, true);
            svgParent.addEventListener("mouseup", this.onHRelRef, true);
        } else {
            svgParent.removeEventListener("mousemove", this.onDragRef);
            svgParent.removeEventListener("mouseup", this.onHRelRef);
        }
    };

    // Consume event if the click is near one of the points of the selected polygon
    // Any ideas how to do it better?
    this.shouldConsumeEvent = function (event) {

        let evPoint = getPoint(event);

        let minDist = 99;

        for (let pt in this.pointsList) {
            let x0 = this.pointsList[pt][0];
            let y0 = this.pointsList[pt][1];

            let dist = Math.sqrt((x0 - evPoint.x) * (x0 - evPoint.x) + (y0 - evPoint.y) * (y0 - evPoint.y));

            if (dist < minDist) {
                minDist = dist;
            }
        }
        return minDist < 2;
    };

    this.onClassUpdate = function(newClass) {
        if (this.label) {
            this.label.setText(newClass);
        }

        // if (newClass in color_scheme) {
        //     this.patch.updateColor(color_scheme[newClass]);
        // } else {
        //     // Reset the color back to default CSS value
        //     this.patch.updateColor("");
        // }

        this.patch.updateColor(colorForClass(newClass));
    }

    // Setup event listeners
    this.patch.node.addEventListener("click", this.onclick.bind(this), true);

    // Some magic:
    this.onDragRef = this.onDrag.bind(this);
    this.onHRelRef = this.onHandleReleased.bind(this);
    this.onHPrRef = this.onHandlePressed.bind(this);

    this.setupHandle(startX, startY, "first", false);

}
