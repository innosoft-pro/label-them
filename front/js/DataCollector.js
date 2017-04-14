/**
 * Created by Mtrs on 08.04.2017.
 */

function DataCollector(){
    this.jsonPoints = [];
    this.jsonParams = [];
}

DataCollector.prototype.setPoints = function (data){
    this.jsonPoints = data;
    this.getJSON();
}

/**
 * Supposed to be called when last phase of labeling is finished
 * @param data params from "Label Parameters"
 */
DataCollector.prototype.setParams = function(data){
    this.jsonParams.push(data);
    this.getJSON();
}

DataCollector.prototype.getJSON = function (){
    var json = Object.assign({}, this);
    console.log(json);
    return json;
}

