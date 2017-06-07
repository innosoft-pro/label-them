/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

/*global DataCollector*/
/*eslint no-undef: "error"*/
var dc = new DataCollector();

function onSave() {
    dc.getJSON();
}

function onPolygonClosed(data) {
    /*global DataEntity*/
    /*eslint no-undef: "error"*/
    let de = new DataEntity(data.polygonId);
    dc.addEntity(de, data.polygonId);

    onSave();
}

function onPolygonSelected(data) {
    dc.selectEntity(data.polygonId);
    setClassesAndParametersValues(dc.getActiveEntity())
}

function onPolygonDeleted(data) {
    dc.deleteEntity(data.polygonId);

    onSave();
}

function onBoolParamUpdate(name, isChecked) {
    dc.getActiveEntity().setParams({[name]: isChecked});

    onSave();
}

function onObjectClassUpdate(value) {
    dc.getActiveEntity().setParams({"class": value});

    onSave();
}

function onSelectParamUpdate(name, value) {
    dc.getActiveEntity().setParams({[name]: value});

    onSave();
}

function onStringParamUpdate(name, value) {
    dc.getActiveEntity().setParams({[name]: value});

    onSave();
}

function resetDataCollector() {
    dc = new DataCollector();
}
