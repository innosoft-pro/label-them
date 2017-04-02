var methodsArray = [save, selectLabel, panTool];

function save() {
    alert("Impement save");
}

function panTool() {
    alert("Implement pan tool");
}

function selectLabel() {
    alert("Implement select label");
}

function render(dom) {
    methodsArray.forEach(method => {
        console.log(method.name)
    dom
        .getElementsByClassName(method.name)[0]
        .addEventListener('click', method);
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
    xobj.open('GET', 'https://rawgit.com/innosoft-pro/label-them/LT-116/front/json/classesandparameters.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);
}

function generateHTMLCodeForClassesAndParameters(dom) {
    // Call to function with anonymous callback
    loadJSON(function (response) {
        jsonresponse = JSON.parse(response);

        var html = [];

        var generalClassesNameTemplate = [];
        var classes = [];

        generalClassesNameTemplate.push('<h4>');
        generalClassesNameTemplate.push(jsonresponse.generalClassesName);
        generalClassesNameTemplate.push(' Type');
        generalClassesNameTemplate.push('</h4>');
        generalClassesNameTemplate = generalClassesNameTemplate.join("");

        classes.push("<div class=\"dropdown\">");
        classes.push("<button class=\"btn btn-default dropdown-toggle\" type=\"button\" ");
        classes.push("id=\"dropdownMenu-Classes\" ");
        classes.push("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">");
        classes.push(jsonresponse.generalClassesName);
        classes.push(' Type');
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

        html.push(generalClassesNameTemplate);
        html.push(classes);

        html = html.join("");

        dom.getElementById('classes-and-parameters').innerHTML += html;
    });
}