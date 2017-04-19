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
    de.setParams({[name]: isChecked});
}

function OnObjectClassUpdate(value) {
    de.setParams({"class": value});
}

function OnSelectParamUpdate(name, value) {
    de.setParams({[name]: value});
}

function OnStringParamUpdate(name, value) {
    de.setParams({[name]: value});
}

function OnSave() {
    dc.getJSON();
}