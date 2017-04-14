/**
 * Created by Mtrs on 08.04.2017.
 */

function DataCollector() {
    this.jsonPoints = [];
    this.jsonParams = [];
}

DataCollector.prototype.setPoints = function (data) {
    this.jsonPoints = data;
    this.getJSON();
}

/**
 * Supposed to be called when last phase of labeling is finished
 * @param data params from "Label Parameters"
 */
DataCollector.prototype.setParams = function (data) {
    this.jsonParams.push(data);
    var jsonData = JSON.stringify(this.jsonParams);
    //console.log(Object.keys(json));

    // Object.keys(JSON.stringify(this.jsonParams)).forEach(function (key) {
    //     console.log(key + "::" + Object.keys(data));
    //     if (key == Object.keys(data)) {
    //         console.log("SAME");
    //         this.jsonParams[key] = data[key];
    //         return data;
    //     }
    // });

    // for(var obj in jsonData){
    //     if(jsonData.hasOwnProperty(obj)){
    //         for(var prop in jsonData[obj]){
    //             if(jsonData[obj].hasOwnProperty(prop)){
    //                 console.log(prop + ':' + jsonData[obj][prop]);
    //             }
    //         }
    //     }
    // }

    this.getJSON();
}

DataCollector.prototype.getJSON = function () {
    //var json = Object.assign({}, this);
    //var json = JSON.stringify(this.jsonPoints);
    var json = JSON.stringify(this);
    console.log(json);
    return json;
}

