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

exports.Task = extend(TolokaHandlebarsTask, function (options) {
    TolokaHandlebarsTask.call(this, options);
}, {

    /**
     *  Add listener to each button based on its class on start
     *  appropriate class for each button should be added in html
     */
    onRender: function () {
        methodsArray.forEach(method => {
            this.getDOMElement()
                .getElementsByClassName(method.name)[0]
                .addEventListener('click', method);
        });

    },
    onDestroy: function () {
        //

    }
});

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
