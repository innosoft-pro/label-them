/**
 * Created by alnedorezov on 3/20/17.
 */
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://rawgit.com/innosoft-pro/label-them/LT-65/front/classesandparameters.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON(function(response) {
    jsonresponse = JSON.parse(response);

    alert(jsonresponse[0].name);

});

var json = '{"result":true,"count":1, "rows": [["data00", "data01", "data02", "data03"], ' +
            '["data10", "data11", "data12", "data13"], ' +
            '["data20", "data21", "data22", "data23"],' +
            '["data30", "data31", "data32", "data33"]]}';
    obj = JSON.parse(json);

function checkJSON() {
    alert(obj.rows);
}