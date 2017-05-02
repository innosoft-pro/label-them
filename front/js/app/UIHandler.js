/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

var de;
var dc = new DataCollector();

function onPolygonClosed(data) {
    de = new DataEntity();
    dc.addEntity(de);
    de.setPoints(data.slice(0, pointsList.length - 1));
}

function onBoolParamUpdate(name, isChecked) {
    var key = name.toString();
    de.setParams({[name]: isChecked});
}

function onObjectClassUpdate(value) {
    de.setParams({"class": value});
}

function onSelectParamUpdate(name, value) {
    de.setParams({[name]: value});
}

function onStringParamUpdate(name, value) {
    de.setParams({[name]: value});
}

function onSave() {
    dc.getJSON();
}