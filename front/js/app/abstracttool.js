/**
 * Created by alnedorezov on 5/26/17.
 */
let Tool = {
    onClick: function (isButtonPressed) {
    }
};

// for creating new objects (tools) with a set of properties, but with a particular prototype
let fromPrototype = function (prototype, object) {
    let newObject = Object.create(prototype);
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
    return newObject;
};