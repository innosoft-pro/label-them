/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

var de;
var dc = new DataCollector();

function OnPolygonClosed(data){
    de = new DataEntity();
    dc.addEntity(de);
    de.setPoints(data.slice(0, pointsList.length - 1));
}

function OnBoolParamUpdate(checkbox){
    de.setParams({"field":checkbox.checked}); //TODO change the field to actual parameter name
    OnSave(); //TODO remove when OnSave() is called after an appropriate event
}

function OnObjectClassUpdate(value){
    de.setParams({"class":value});
    OnSave(); //TODO remove when OnSave() is called after an appropriate event
}

function OnParamStringUpdate(value){
    de.setParams({"stringfield":value});
    OnSave(); //TODO remove when OnSave() is called after an appropriate event
}

function OnSave(){
    dc.getJSON();
}