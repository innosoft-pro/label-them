function save() {
    OnSave();
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