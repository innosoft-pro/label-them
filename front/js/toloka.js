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

function initToloka() {
  TolokaTask.prototype['onRender'] = function() {
      this.getDOMElement()
          .getElementsByClassName("btnsave")[0]
          .addEventListener('click', OnSave);

      this.getDOMElement()
          .getElementsByClassName("btn-polygon")[0]
          .addEventListener('click', svgImgOnClick(event));
      window.thisTask = this;
  }
}

function tolokaReadyFn( jQuery ) {
    initToloka();
    initDOM();
    initCanvas()
}

$( document ).ready(tolokaReadyFn);


// var LTTask = extend(TolokaTask, function() {
//     TolokaTask.call(this);
// }, {
//     onRender: function() {
//       alert("OnRender Called!");
//
//
//     }
// })
