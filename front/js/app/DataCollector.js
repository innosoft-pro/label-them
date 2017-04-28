/**
 * Created by Alexey Merzlikin on 08.04.2017.
 */

function DataCollector() {
    this.dataEntities = [];
}

DataCollector.prototype.addEntity = function (entity) {
    this.dataEntities.push(entity);
};

function DataEntity() {
    this.jsonPoints = [];
    this.jsonParams = {};
}

DataEntity.prototype.setPoints = function (data) {
    this.jsonPoints = data;
};

DataEntity.prototype.setParams = function (data) {
    this.jsonParams = Object.assign(this.jsonParams, data);
};

DataCollector.prototype.getJSON = function () {
    var json = JSON.stringify(this);
    window.thisTask.setSolutionOutputValue("result_json", resultJson);
    console.log(window.thisTask.validate(window.thisTask.getSolution()) + " valid");
    console.log(window.thisTask.getSolution());
    return json;
};

