/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

var de;
var dc = new DataCollector();

function OnPolygonClosed(data) {
    de = new DataEntity();
    dc.addEntity(de);
    de.setPoints(data.slice(0, pointsList.length - 1));
}

function OnBoolParamUpdate(name, isChecked) {
    de.setParams({"parameterName": name, "parameterValue": isChecked}); //TODO change the field to actual parameter name
}

function OnObjectClassUpdate(value) {
    de.setParams({"class": value});
}

function OnSelectParamUpdate(name, value) {
    de.setParams({"parameterName": name, "parameterValue": value});
}

function OnStringParamUpdate(name, value) {
    de.setParams({"parameterName": name, "parameterValue": value});
}

function OnSave() {
    dc.getJSON();
}