/**
 * Created by Alexey Merzlikin on 08.04.2017.
 */

var outputJson = "";

/**
 * Represents a list of labeled objects.
 * @constructor
 */
function DataCollector() {
    this.dataEntities = {};

    this.activeEntity = null;
}

/** Class representing a data entity to be exported */
class DataEntityToBeExported {
    constructor(entity) {
        /*global polygonId, polygons*/
        /*eslint no-undef: "error"*/
        this.points = polygons[entity.polygonId].unscaledPoints();
        this.parameters = entity.parameters;
    }

    toString() {
        return JSON.stringify(this);
    }
}

/**
 * Add a labeled object.
 * @param {DataEntity} entity - entity to add to data collector list of entities
 * @param {number} id - id of the added entity
 */
DataCollector.prototype.addEntity = function (entity, id) {
    this.dataEntities[id] = entity;
};

/**
 * Set an entity as the current entity.
 * @param {number} id - id of the selected entity
 */
DataCollector.prototype.selectEntity = function (id) {
    this.activeEntity = this.dataEntities[id];
};

/**
 * Select parameters of the entity.
 * @param {number} id - id of the entity
 * @return {[]} parameters - parameters of the entity
 */
DataCollector.prototype.getEntitiesParameters = function (id) {
    return this.dataEntities[id].parameters;
};

/**
 * Delete the entity.
 * @param {number} id - id of the entity
 */
DataCollector.prototype.deleteEntity = function (id) {
    if (id in this.dataEntities) {
        delete this.dataEntities[id];
        if (this.getActiveEntity() !== null && id === this.getActiveEntity().polygonId) {
            this.activeEntity = null;
        }
    }
};

/**
 * Select the current entity.
 * @return {DataEntity} activeEntity - the current entity
 */
DataCollector.prototype.getActiveEntity = function () {
    return this.activeEntity;
};

/**
 * Make the current entity null.
 */
DataCollector.prototype.nullifyActiveEntity = function () {
    this.activeEntity = null;
};

/**
 * Represents an object that collects data of a labeled object.
 * @constructor
 */
function DataEntity(polygonId) {
    /*global polygonId*/
    /*eslint no-undef: "error"*/
    this.polygonId = polygonId;
    this.parameters = {};
}

/**
 * Set parameters of the entity
 * @param {T} data - parameters
 */
DataEntity.prototype.setParams = function (data) {
    this.parameters = Object.assign(this.parameters, data);
};

/**
 * Get parameter of the entity by a name
 * @param {string} parameterName - name of the parameter
 * @return {value} value - value of the parameter
 */
DataEntity.prototype.getParameterByName = function (parameterName) {
    if (this.parameters === undefined || this.parameters === null || !this.parameters.hasOwnProperty(parameterName)) {
        return null;
    } else {
        return Object.getOwnPropertyDescriptor(this.parameters, parameterName).value;
    }
};

/**
 * Delete parameter of the entity by a name
 * @param {string} parameterName - name of the parameter
 */
DataEntity.prototype.deleteParameterByName = function (parameterName) {
    if (this.parameters.hasOwnProperty(parameterName)) {
        delete this.parameters[parameterName];
    }
};

/**
 * Get data collector's list of entities as JSON
 * @return {string} outputJSON - list of entities as JSON
 */
DataCollector.prototype.getJSON = function () {
    let dataEntities = [];
    /*global polygonId*/
    /*eslint no-undef: "error"*/
    for (let i = 0; i < polygonId; i++) {
        if (this.dataEntities.hasOwnProperty(i)) { // check if data entity with id=i wasn't deleted (exists)
            dataEntities.push(new DataEntityToBeExported(this.dataEntities[i]));
        }
    }
    outputJson = JSON.stringify(dataEntities);
    if (window.thisTask !== undefined && window.thisTask !== null) {
        window.thisTask.setSolutionOutputValue("result", outputJson);
    } else {
        console.log(outputJson); // To check output values on localhost
    }

    return outputJson;
};
