function init() {
    resize();

}

// loading remote image
var img = new Image();
img.src = "https://actingmylife.files.wordpress.com/2015/06/img_1730.jpg";
var aspectRatio = img.width / img.height;

function drawImg(img) {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    var targetWidth = canvas.height * aspectRatio;
    var targetX = (canvas.width - targetWidth) / 2;

    ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
        targetX, 0, targetWidth, canvas.height); // destination rectangle
}

// handles resizing of the canvas
function resize() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    // make canvas fit parent div
    var parent = document.getElementById("canvas-parent");
    var svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (parent.clientWidth + 28) / aspectRatio + "px";

    var height = parent.clientHeight;
    var width = parent.clientWidth;

    // modify both canvas style and canvas dimension
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    canvas.width = width;
    canvas.height = height;
    svg.style.width = width;
    svg.style.height = height;

    drawImg(img);
}

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);

var svgImg;

function initCoordinates(svg) {
    svgImg = svg;
}

function getX(event) {
    event = event || window.event;
    return event.pageX - svgImg.node.getBoundingClientRect().left;
}

function getY(event) {
    event = event || window.event;
    return event.pageY - svgImg.node.getBoundingClientRect().top;
}

function getPoint(event) {
    var point = {
        x: getX(event),
        y: getY(event),
        isFirst: false
    };
    return point;
}
/**
 * Created by alnedorezov on 4/18/17.
 */
var urlToJSONWithClassesAndParameters =
    "https://rawgit.com/innosoft-pro/label-them/develop/front/json/classesandparameters.json";


// request data from JSON file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", urlToJSONWithClassesAndParameters, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);
}

// Generate HTML code for classes and parameters described in json/classesandparameters.json
// Adds this HTML code to div with id="classes-and-parameters" in main.html
function generateHTMLCodeForClassesAndParameters(dom) {
    // Call to function with anonymous callback
    loadJSON(function (response) {
        var jsonresponse = JSON.parse(response);

        var html = [];

        var classes = [];
        var parameters = [];

        classes.push("<h4>");
        classes.push("Objects Classes");
        classes.push("</h4>");

        classes.push("<div class=\"dropdown\">");
        classes.push("<button class=\"btn btn-default dropdown-toggle\" type=\"button\" ");
        classes.push("id=\"dropdownMenu-Classes\" ");
        classes.push("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">");
        classes.push("Objects Classes");
        classes.push("<span class=\"caret\"></span>");
        classes.push("</button>");
        classes.push("<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu-Classes\">");

        jsonresponse.classes.forEach(function (obj) {
            classes.push("<li><a role=\"menuitem\" tabindex=\"-1\" href=\"#\">");
            classes.push(obj);
            classes.push("</a></li>");
        });

        classes.push("</ul>");
        classes.push("</div>");
        classes = classes.join("");

        if (jsonresponse.parameters !== null) {
            var dropdownMenusCount = 0;
            var inputGroupsCount = 0;

            //To separate objects classes from parameters
            parameters.push("</br>");

            parameters.push("<h4>");
            parameters.push("Objects Parameters");
            parameters.push("</h4>");

            parameters.push("<form>");
            jsonresponse.parameters.forEach(function (obj) {
                if (obj.type === "boolean") {
                    parameters.push("<div class=\"checkbox\">");
                    parameters.push("<label><input type=\"checkbox\" value=\"\">");
                    parameters.push(obj.name);
                    parameters.push("</label>");
                    parameters.push("</div>");
                } else if (obj.type === "string") {
                    inputGroupsCount++;
                    parameters.push("<div class=\"input-group\">");
                    parameters.push("<span class=\"input-group-addon\" id=\"basic-addon");
                    parameters.push(inputGroupsCount);
                    parameters.push("\">");
                    parameters.push(obj.prefix);
                    parameters.push("</span>");
                    parameters.push("<input type=\"text\" class=\"form-control\" placeholder=\"");
                    parameters.push(obj.name);
                    parameters.push("\" aria-describedby=\"basic-addon");
                    parameters.push(inputGroupsCount);
                    parameters.push("\">");
                    parameters.push("</div>");
                } else if (obj.type === "select") {
                    dropdownMenusCount++;
                    parameters.push("<div class=\"dropdown\">");
                    parameters.push("<button class=\"btn btn-default dropdown-toggle");
                    // Additional margin to add some space between input groups and drop down menus
                    // Otherwise they stick to one another
                    if (inputGroupsCount > 0 && dropdownMenusCount === 1 || dropdownMenusCount > 1) {
                        parameters.push(" dropdown-menu-parameters");
                    }
                    parameters.push("\" type=\"button\" ");
                    parameters.push("id=\"dropdownMenu-parameters");
                    parameters.push(dropdownMenusCount);
                    parameters.push("\" ");
                    parameters.push("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">");
                    parameters.push(obj.name);
                    parameters.push("<span class=\"caret\"></span>");
                    parameters.push("</button>");
                    parameters.push("<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu-parameters");
                    parameters.push(dropdownMenusCount);
                    parameters.push("\">");

                    obj.options.forEach(function (obj2) {
                        parameters.push("<li><a role=\"menuitem\" tabindex=\"-1\" href=\"#\">");
                        parameters.push(obj2);
                        parameters.push("</a></li>");
                    });

                    parameters.push("</ul>");
                    parameters.push("</div>");
                }
            });
            parameters.push("</form>");
            parameters = parameters.join("");
        }

        html.push(classes);
        html.push(parameters);

        html = html.join("");

        dom.getElementById("classes-and-parameters").innerHTML += html;
    });
}
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

var btnSave;
var btnHand;
var btnPolygon;
var btnEdit;
var btnZoomIn;
var btnZoomOut;
var btnBrightnessHigh;
var btnBrightnessLow;


function initNavMenu() {
    getElements();
    setElementsOnClick();
}

function setElementsOnClick() {
    setOnClick(btnSave);
    setOnClick(btnHand);
    setOnClick(btnPolygon);
    setOnClick(btnEdit);
    setOnClick(btnZoomIn);
    setOnClick(btnZoomOut);
    setOnClick(btnBrightnessHigh);
    setOnClick(btnBrightnessLow);
}

function getElements() {
    btnSave = document.getElementById('btn_save');
    btnHand = document.getElementById('btn_hand');
    btnPolygon = document.getElementById('btn_polygon');
    btnEdit = document.getElementById('btn_edit');
    btnZoomIn = document.getElementById('btn_zoom_in');
    btnZoomOut = document.getElementById('btn_zoom_out');
    btnBrightnessHigh = document.getElementById('btn_brightness_high');
    btnBrightnessLow = document.getElementById('btn_brightness_low');
}

function btnSaveFunc(btnIsSelected) {

}

function btnHandFunc(btnIsSelected) {

}

function clearOnClick(element) {
    element.onclick = '';
}
function btnPolygonFunc(btnIsSelected) {
    if (btnIsSelected) {
        svgImg.node.onclick = function () {
            svgImgOnClick(event);
        };
    } else {
        clearOnClick(svgImg.node.onclick);
    }
}

function btnEditFunc(btnIsSelected) {

}

function btnZoomInFunc(btnIsSelected) {

}

function btnZoomOutFunc(btnIsSelected) {

}

function btnBrightnessHighFunc(btnIsSelected) {

}

function btnBrightnessLowFunc(btnIsSelected) {

}

function setOnClick(btn) {
    btn.onclick = function () {
        var btnIsSelected = false;
        if (isButtonSelected(btn)) {
            btnIsSelected = true;
        }

        switch (btn.id) {
            case 'btn_save':
                btnSaveFunc(btnIsSelected);
                break;
            case 'btn_hand':
                btnHandFunc(btnIsSelected);
                break;
            case 'btn_polygon':
                btnPolygonFunc(btnIsSelected);
                break;
            case 'btn_edit':
                btnEditFunc(btnIsSelected);
                break;
            case 'btn_zoom_in':
                btnZoomInFunc(btnIsSelected);
                break;
            case 'btn_zoom_out':
                btnZoomOutFunc(btnIsSelected);
                break;
            case 'btn_brightness_high':
                btnBrightnessHighFunc(btnIsSelected);
                break;
            case 'btn_brightness_low':
                btnBrightnessLowFunc(btnIsSelected);
                break;
        }
    }
}

function isButtonSelected(btn) {
    if (btn.style.background === 'rgb(27, 109, 133)') {
        btn.style.background = '#ffffff';
        return false;
    } else {
        btn.style.background = '#1b6d85';
        return true;
    }
}
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
    $("#message_space").slideDown(1000);
    setTimeout(function () {
        $("#message_space").slideUp(1000);
    }, 3000);
}