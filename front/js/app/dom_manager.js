var selectDefaultParameters = [];

// Generate HTML code for classes and parameters described in json/classesandparameters.json
// Adds this HTML code to div with id="classes-and-parameters" in main.html
function generateHTMLCodeForClassesAndParameters(dom, phrase) {

    // alert(phrase);
    var jsonresponse = JSON.parse(phrase);


    var html = [];

    var classes = [];
    var parameters = [];

    classes.push("<h4>");
    classes.push("Objects Classes");
    classes.push("</h4>");
    parameters.push("<div class=\"dropdown dropdown-menu-parameters\">");
    parameters.push("<select class=\"class-param\" name=\"");
    parameters.push("\">");
    // Additional margin to add some space between input groups and drop down menus
    // Otherwise they stick to one another
    parameters.push("<option disabled selected hidden>");
    parameters.push("Select Class");
    parameters.push("</option>");
    jsonresponse.classes.forEach(function (obj) {
        parameters.push("<option ");
        parameters.push("value=\"");
        parameters.push(obj);
        parameters.push("\">");
        parameters.push(obj);
        parameters.push("</option>");
    });
    parameters.push("</select>");
    parameters.push("</div>");
    classes = classes.join("");

    if (jsonresponse.parameters !== null) {
        var dropdownMenusCount = 0;
        var inputGroupsCount = 0;

        //To separate objects classes from parameters
        parameters.push("</br>");

        parameters.push("<h4>");
        parameters.push("Objects Parameters");
        parameters.push("</h4>");

        parameters.push("<form>");
        jsonresponse.parameters.forEach(function (obj) {
            if (obj.type === "boolean") {
                parameters.push("<div class=\"checkbox\">");
                parameters.push("<label><input class=\"bool-param\" type=\"checkbox\" value=\"\" name=\"");
                parameters.push(obj.name);
                parameters.push("\">");
                parameters.push(obj.name);
                parameters.push("</label>");
                parameters.push("</div>");
            } else if (obj.type === "string") {
                inputGroupsCount++;
                parameters.push("<div class=\"input-group\">");
                parameters.push("<span class=\"input-group-addon\" id=\"basic-addon");
                parameters.push(inputGroupsCount);
                parameters.push("\">");
                parameters.push(obj.prefix);
                parameters.push("</span>");
                parameters.push("<input type=\"text\" class=\"form-control string-param\" placeholder=\"");
                parameters.push(obj.name);
                parameters.push("\" aria-describedby=\"basic-addon");
                parameters.push(inputGroupsCount);
                parameters.push("\">");
                parameters.push("</div>");
            } else if (obj.type === "select") {
                dropdownMenusCount++;
                parameters.push("<div class=\"dropdown dropdown-menu-parameters\">");
                parameters.push("<select class=\"select-param\" name=\"");
                parameters.push(obj.name);
                parameters.push("\">");
                // Additional margin to add some space between input groups and drop down menus
                // Otherwise they stick to one another
                parameters.push("<option disabled selected hidden>");
                parameters.push(obj.name);
                selectDefaultParameters.push(obj.name);
                parameters.push("</option>");
                obj.options.forEach(function (obj2) {
                    parameters.push("<option ");
                    parameters.push("value=\"");
                    parameters.push(obj2);
                    parameters.push("\">");
                    parameters.push(obj2);
                    parameters.push("</option>");
                });
                parameters.push("</select>");
                parameters.push("</div>");
            }
        });
        parameters.push("</form>");
        parameters = parameters.join("");
    }

    html.push(classes);
    html.push(parameters);

    html = html.join("");

    dom.getElementById("classes-and-parameters").innerHTML += html;

    /*global onObjectClassUpdate*/
    /*eslint no-undef: "error"*/
    var classParams = document.getElementsByClassName("class-param");
    Array.prototype.forEach.call(classParams, param => {
        param.addEventListener("change", function () {
            onObjectClassUpdate(param.value);
        }, false);
    });

    /*global onBoolParamUpdate*/
    /*eslint no-undef: "error"*/
    var boolParams = document.getElementsByClassName("bool-param");
    Array.prototype.forEach.call(boolParams, param => {
        param.addEventListener("click", function () {
            onBoolParamUpdate(param.name, param.checked);
        }, false);
    });

    /*global onStringParamUpdate*/
    /*eslint no-undef: "error"*/
    var stringParams = document.getElementsByClassName("string-param");
    Array.prototype.forEach.call(stringParams, param => {
        param.addEventListener("change", function () {
            onStringParamUpdate(param.placeholder, param.value);
        }, false);
    });

    /*global onSelectParamUpdate*/
    /*eslint no-undef: "error"*/
    var selectParams = document.getElementsByClassName("select-param");
    Array.prototype.forEach.call(selectParams, param => {
        param.addEventListener("change", function () {
            onSelectParamUpdate(param.name, param.value);
        }, false);
    });


}

/*
Reset all values of class selector and parameters to default values
 */
function resetClassesAndParametersValues(document) {
    var classParameters = document.getElementsByClassName("class-param");
    Array.prototype.forEach.call(classParameters, parameter => {
        parameter.value = "Select Class";
    });

    var boolParameters = document.getElementsByClassName("bool-param");
    Array.prototype.forEach.call(boolParameters, parameter => {
        parameter.checked = false;
    });

    var stringParameters = document.getElementsByClassName("string-param");
    Array.prototype.forEach.call(stringParameters, parameter => {
        parameter.value = "";
    });

    var selectParameters = document.getElementsByClassName("select-param");
    for (var i = 0; i < selectParameters.length; i++) {
        selectParameters.item(i).value = selectDefaultParameters[i];
    }
}

// Message type which correspond to the ones used in bootstrap
var MessageTypeEnum = Object.freeze({SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4});

/**
 * showMessage function displays specified message in message_space block
 * @input message - text of the message to be displayed
 * @input messageType - type of the message to be displayed (can be one of {SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4})
 *                      INFO type is used by default
 */
function showMessage(message, messageType) {
    if ((typeof message === "string" || message instanceof String) && document.getElementById("message_space")) {

        // Specify the type of the alert message
        switch (messageType) {
            case MessageTypeEnum.SUCCESS:
                document.getElementById("message_space").className = "alert alert-success";
                break;
            case MessageTypeEnum.INFO:
                document.getElementById("message_space").className = "alert alert-info";
                break;
            case MessageTypeEnum.WARNING:
                document.getElementById("message_space").className = "alert alert-warning";
                break;
            case MessageTypeEnum.DANGER:
                document.getElementById("message_space").className = "alert alert-danger";
                break;
            default:
                //messageSpaceBlocksClassName = "alert alert-info";
                break;
        }

        $("#message_space").text(message);
    }
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function initDOM() {
    var json_params = document.getElementById("json_params").innerText;
    // Toloka strips all strings of double quotes for reasons unknown so in order
    // to get JSON.parse to work we need to replace all occurence of \ with "
    // otherwise JSON.parse will fail. Need to clarify this with Y.T. manager,
    // but until then this does the job

    json_params = replaceAll(json_params, '\\', '"');
    generateHTMLCodeForClassesAndParameters(document, json_params);
}

function resetDOM() {
    var json_params = document.getElementById("json_params").innerText;
    // Toloka strips all strings of double quotes for reasons unknown so in order
    // to get JSON.parse to work we need to replace all occurence of \ with "
    // otherwise JSON.parse will fail. Need to clarify this with Y.T. manager,
    // but until then this does the job

    json_params = replaceAll(json_params, '\\', '"');
    resetClassesAndParametersValues(document);
}