/**
 * Created by Mtrs on 14.04.2017.
 */

var dc; 

function OnPolygonClosed(data){
    dc = new DataCollector();
    dc.setPoints(data.slice(0, pointsList.length - 1));
}

function OnObjectClassUpdate(value){
    dc.setParams("type:{value}");
}