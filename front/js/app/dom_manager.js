/**
 * Created by alnedorezov on 4/18/17.
 */
var urlToJSONWithClassesAndParameters =
    "https://rawgit.com/innosoft-pro/label-them/develop/front/json/classesandparameters.json";


// request data from JSON file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", urlToJSONWithClassesAndParameters, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    };
    xobj.send(null);
}

// Generate HTML code for classes and parameters described in json/classesandparameters.json
// Adds this HTML code to div with id="classes-and-parameters" in main.html
function generateHTMLCodeForClassesAndParameters(dom) {
    // Call to function with anonymous callback
    loadJSON(function (response) {
        var jsonresponse = JSON.parse(response);

        var html = [];

        var classes = [];
        var parameters = [];

        classes.push("<h4>");
        classes.push("Objects Classes");
        classes.push("</h4>");

        classes.push("<div class=\"dropdown\">");
        classes.push("<button class=\"btn btn-default dropdown-toggle\" type=\"button\" ");
        classes.push("id=\"dropdownMenu-Classes\" ");
        classes.push("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">");
        classes.push("Objects Classes");
        classes.push("<span class=\"caret\"></span>");
        classes.push("</button>");
        classes.push("<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu-Classes\" onchange=\"OnObjectClassUpdate(this.value)\">");

        jsonresponse.classes.forEach(function (obj) {
            classes.push("<li><a role=\"menuitem\" onclick=\"OnObjectClassUpdate(this.textContent)\" tabindex=\"-1\" href=\"#\">");
            classes.push(obj);
            classes.push("</a></li>");
        });

        classes.push("</ul>");
        classes.push("</div>");
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
                    parameters.push("<label><input type=\"checkbox\" value=\"\" onchange=\"OnBoolParamUpdate(this)\">");
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
                    parameters.push("<input type=\"text\" onchange=\"OnParamStringUpdate(this.value)\" class=\"form-control\" placeholder=\"");
                    parameters.push(obj.name);
                    parameters.push("\" aria-describedby=\"basic-addon");
                    parameters.push(inputGroupsCount);
                    parameters.push("\">");
                    parameters.push("</div>");
                } else if (obj.type === "select") {
                    dropdownMenusCount++;
                    parameters.push("<div class=\"dropdown\">");
                    parameters.push("<button class=\"btn btn-default dropdown-toggle");
                    // Additional margin to add some space between input groups and drop down menus
                    // Otherwise they stick to one another
                    if (inputGroupsCount > 0 && dropdownMenusCount === 1 || dropdownMenusCount > 1) {
                        parameters.push(" dropdown-menu-parameters");
                    }
                    parameters.push("\" type=\"button\" ");
                    parameters.push("id=\"dropdownMenu-parameters");
                    parameters.push(dropdownMenusCount);
                    parameters.push("\" ");
                    parameters.push("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">");
                    parameters.push(obj.name);
                    parameters.push("<span class=\"caret\"></span>");
                    parameters.push("</button>");
                    parameters.push("<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu-parameters");
                    parameters.push(dropdownMenusCount);
                    parameters.push("\">");

                    obj.options.forEach(function (obj2) {
                        parameters.push("<li><a role=\"menuitem\" tabindex=\"-1\" href=\"#\" onclick=\"OnObjectClassUpdate(this.textContent)\">");
                        parameters.push(obj2);
                        parameters.push("</a></li>");
                    });

                    parameters.push("</ul>");
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
    });
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