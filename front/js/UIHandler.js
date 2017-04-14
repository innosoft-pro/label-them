/**
 * Created by Mtrs on 14.04.2017.
 */

var dc; 

function OnPolygonClosed(data){
    dc = new DataCollector();
    dc.setPoints(data.slice(0, pointsList.length - 1));
}

function OnBoolParamUpdate(checkbox){
    dc.setParams({"field":checkbox.checked}); //TODO change the field to actual parameter name
}

function OnObjectClassUpdate(value){
    dc.setParams({"class":value});
}

function OnParamStringUpdate(value){
    dc.setParams({"field":value});
}