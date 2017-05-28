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
    this.points = [];
    this.parameters = {};
}

DataEntity.prototype.setPoints = function (data) {
    this.points = data;
};

DataEntity.prototype.setParams = function (data) {
    this.parameters = Object.assign(this.parameters, data);
};

DataCollector.prototype.getJSON = function () {
    let json = JSON.stringify(this);
    window.thisTask.setSolutionOutputValue("result", json);
    return json;
};
