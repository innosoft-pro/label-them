/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

/*global DataCollector*/
/*eslint no-undef: "error"*/
var dc = new DataCollector();

function onPolygonClosed(data) {
    /*global DataEntity*/
    /*eslint no-undef: "error"*/
    let de = new DataEntity(data.polygonId);
    dc.addEntity(de, data.polygonId);
}

function onPolygonSelected(data) {
    dc.selectEntity(data.polygonId);
    setClassesAndParametersValues(dc.getActiveEntity())
}

function onPolygonDeleted(data) {
    dc.deleteEntity(data.polygonId);
}

function onBoolParamUpdate(name, isChecked) {
    dc.getActiveEntity().setParams({[name]: isChecked});
}

function onObjectClassUpdate(value) {
    dc.getActiveEntity().setParams({"class": value});
}

function onSelectParamUpdate(name, value) {
    dc.getActiveEntity().setParams({[name]: value});
}

function onStringParamUpdate(name, value) {
    dc.getActiveEntity().setParams({[name]: value});
}

function onSave() {
    dc.getJSON();
}

function resetDataCollector() {
    dc = new DataCollector();
}
