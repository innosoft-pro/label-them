var methodsArray = [save, selectLabel, panTool, getJSON];

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
    methodsArray.forEach(method = > {
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
    xobj.open('GET', 'https://rawgit.com/innosoft-pro/label-them/4ecbd548ae1315469a73118e8c807c451ee95a56/front/classesandparameters.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);
}

function getJSON() {
    // Call to function with anonymous callback
    loadJSON(function (response) {
        jsonresponse = JSON.parse(response);

        alert(jsonresponse.result);
    });
}