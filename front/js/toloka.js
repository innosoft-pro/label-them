var urlToJSONWithClassesAndParameters =
    "https://rawgit.com/innosoft-pro/label-them/develop/front/json/classesandparameters.json";

function save() {
    alert("Implement save");
}

function panTool() {
    alert("Implement pan tool");
}

var methodsArray = [save, panTool];

function render(dom) {
    methodsArray.forEach((method) => {
        dom
            .getElementsByClassName(method.name)[0]
            .addEventListener("click", method);
    })
    ;
}

// Uncomment before the deployment in Yandex.Toloka
/*
 exports.Task = extend(TolokaHandlebarsTask, function (options) {
 TolokaHandlebarsTask.call(this, options);
 }, {

 // Add listener to each button based on its class on start
 // appropriate class for each button should be added in html
 onRender: function() { render(this.getDOMElement()); },
 onDestroy: function () {
 //

 }
 });
 */

function extend(ParentClass, constructorFunction, prototypeHash) {
    constructorFunction = constructorFunction || function () {
        };
    prototypeHash = prototypeHash || {};
    if (ParentClass) {
        constructorFunction.prototype = Object.create(ParentClass.prototype);
    }
    for (var i in prototypeHash) {
        constructorFunction.prototype[i] = prototypeHash[i];
    }
    return constructorFunction;
}

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