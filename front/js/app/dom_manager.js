var selectDefaultParameters = [];

// Generate HTML code for classes and parameters described in json/classesandparameters.json
// Adds this HTML code to div with id="classes-and-parameters" in main.html
function generateHTMLCodeForClassesAndParameters(dom, phrase, acceptMode = false) {

    // alert(phrase);
    let jsonResponse = JSON.parse(phrase);

    let html = [];

    let classes = [];
    let parameters = [];

    classes.push("<h4>");
    classes.push("Objects Classes");
    classes.push("</h4>");
    parameters.push("<div class=\"dropdown dropdown-menu-parameters\">");
    parameters.push("<select class=\"class-param form-control\" name=\"");
    parameters.push("class");
    parameters.push("\">");
    // Additional margin to add some space between input groups and drop down menus
    // Otherwise they stick to one another
    parameters.push("<option disabled selected hidden>");
    parameters.push("Select Class");
    parameters.push("</option>");
    jsonResponse.classes.forEach(function (obj) {
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

    if (jsonResponse.parameters !== undefined && jsonResponse.parameters !== null) {
        let dropdownMenusCount = 0;
        let inputGroupsCount = 0;

        //To separate objects classes from parameters
        parameters.push("</br>");

        parameters.push("<h4>");
        parameters.push("Objects Parameters");
        parameters.push("</h4>");

        parameters.push("<form>");
        jsonResponse.parameters.forEach(function (obj) {
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
                parameters.push("\" name=\"");
                parameters.push(obj.name);
                parameters.push("\" aria-describedby=\"basic-addon");
                parameters.push(inputGroupsCount);
                parameters.push("\">");
                parameters.push("</div>");
            } else if (obj.type === "select") {
                dropdownMenusCount++;
                parameters.push("<div class=\"dropdown dropdown-menu-parameters\">");
                parameters.push("<select class=\"select-param form-control\" name=\"");
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
    }
    parameters = parameters.join("");

    html.push(classes);
    html.push(parameters);

    html = html.join("");

    dom.getElementById("classes-and-parameters").innerHTML += html;

    if (!acceptMode) {
        /*global onObjectClassUpdate*/
        /*eslint no-undef: "error"*/
        let classParams = document.getElementsByClassName("class-param");
        Array.prototype.forEach.call(classParams, param => {
            param.addEventListener("change", function () {
                onObjectClassUpdate(param.value);
            }, false);
        });

        /*global onBoolParamUpdate*/
        /*eslint no-undef: "error"*/
        let boolParams = document.getElementsByClassName("bool-param");
        Array.prototype.forEach.call(boolParams, param => {
            param.addEventListener("click", function () {
                onBoolParamUpdate(param.name, param.checked);
            }, false);
        });

        /*global onStringParamUpdate*/
        /*eslint no-undef: "error"*/
        let stringParams = document.getElementsByClassName("string-param");
        Array.prototype.forEach.call(stringParams, param => {
            param.addEventListener("change", function () {
                onStringParamUpdate(param.placeholder, param.value);
            }, false);
        });

        /*global onSelectParamUpdate*/
        /*eslint no-undef: "error"*/
        let selectParams = document.getElementsByClassName("select-param");
        Array.prototype.forEach.call(selectParams, param => {
            param.addEventListener("change", function () {
                onSelectParamUpdate(param.name, param.value);
            }, false);
        });
    }
}

/**
 *  Reset all values of class selector and parameters to default values
 */
function resetClassesAndParametersValues(document) {
    let classParameters = document.getElementsByClassName("class-param");
    Array.prototype.forEach.call(classParameters, parameter => {
        parameter.value = "Select Class";
    });

    let boolParameters = document.getElementsByClassName("bool-param");
    Array.prototype.forEach.call(boolParameters, parameter => {
        parameter.checked = false;
    });

    let stringParameters = document.getElementsByClassName("string-param");
    Array.prototype.forEach.call(stringParameters, parameter => {
        parameter.value = "";
    });

    let selectParameters = document.getElementsByClassName("select-param");
    for (let i = 0; i < selectParameters.length; i++) {
        selectParameters.item(i).value = selectDefaultParameters[i];
    }
}

function setClassesAndParametersValues(dataEntity) {

    resetDOM();

    for (let key in dataEntity.parameters) {
        if (dataEntity.parameters.hasOwnProperty(key)) {
            // console.log(key + " -> " + dataEntity.parameters[key]);
            let el = document.getElementsByName(key)[0];
            // console.log(el);


            if (el.type === "checkbox") {
                el.checked = dataEntity.parameters[key];
            } else {
                el.value = dataEntity.parameters[key];
            }


        }
    }
}

// Message type which correspond to the ones used in bootstrap
var MessageTypeEnum = Object.freeze({SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4});

// Specifying the type of the alert message
function specifyAlertMessageType(messageType) {
    switch (messageType) {
        case MessageTypeEnum.SUCCESS:
            return "alert alert-success";
        case MessageTypeEnum.INFO:
            return "alert alert-info";
        case MessageTypeEnum.WARNING:
            return "alert alert-warning";
        case MessageTypeEnum.DANGER:
            return "alert alert-danger";
        default:
            return "alert alert-info";
    }
}

/**
 * showMessage function displays specified message in message_space block
 * @input message - text of the message to be displayed
 * @input messageType - type of the message to be displayed (can be one of {SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4})
 *                      INFO type is used by default
 */
function showMessage(message, messageType) {
    if ((typeof message === "string" || message instanceof String) && document.getElementById("message_space")) {

        // Specify the type of the alert message
        document.getElementById("message_space").className = specifyAlertMessageType(messageType);

        $("#message_space").text(message);
    }
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function initDOM(acceptMode) {
    let jsonParams = document.getElementById("json_params").innerText;
    // Toloka strips all strings of double quotes for reasons unknown so in order
    // to get JSON.parse to work we need to replace all occurence of \ with "
    // otherwise JSON.parse will fail. Need to clarify this with Y.T. manager,
    // but until then this does the job

    jsonParams = replaceAll(jsonParams, '\\', '"');
    generateHTMLCodeForClassesAndParameters(document, jsonParams, acceptMode);
    initRowsAdditionAndDeletion();
    initColorScheme(jsonParams);
}

function resetDOM() {
    resetClassesAndParametersValues(document);
}

function initRowsAdditionAndDeletion() {
    let addRowButton = document.getElementById("add-row");
    let deleteRowButton = document.getElementById("delete-row");
    addRowButton.onclick = function () {
        /*global redoHistoryRecordsAddition*/
        /*eslint no-undef: "error"*/
        redoHistoryRecordsAddition();
    };

    deleteRowButton.onclick = function () {
        /*global undoHistoryRecordsAddition*/
        /*eslint no-undef: "error"*/
        undoHistoryRecordsAddition();
    };

    enableOrDisableAnElementById("delete-row", false);
    enableOrDisableAnElementById("add-row", false);
}

let rowsCount = 0;

function addHistoryRow(text = "Polygon",
                       icon = "https://rawgit.com/innosoft-pro/label-them/develop-toloka/front/img/polygon_tool_button.png") {
    let newRowsContents = [];
    newRowsContents.push("<td class=\"history-icon-td\">");
    newRowsContents.push("<button class=\"btn btn-default\" id=\"iconOnHistoryRow");
    newRowsContents.push(rowsCount);
    newRowsContents.push("\">");
    newRowsContents.push("<img src=\"");
    newRowsContents.push(icon);
    newRowsContents.push("\"");
    newRowsContents.push("width=\"24\"/>");
    newRowsContents.push("</button>");
    newRowsContents.push("</td>");
    newRowsContents.push("<td class=\"history-text-td\">");
    newRowsContents.push(text);
    newRowsContents.push("</td>");
    newRowsContents = newRowsContents.join("");
    $('#history-table').append('<tr class="history-table-row" id="historyRow' + rowsCount + '"></tr>');
    $('#historyRow' + rowsCount).html(newRowsContents);
    addOnConcreteRecordButtonClickListener(rowsCount);
    rowsCount++;
    /*global scrollHistoryTableBodyToBottom*/
    /*eslint no-undef: "error"*/
    scrollHistoryTableBodyToBottom();
}

function deleteHistoryRow() {
    if (rowsCount > 0) {
        $("#historyRow" + (rowsCount - 1)).remove();
        rowsCount--;
    }
    /*global scrollHistoryTableBodyToBottom*/
    /*eslint no-undef: "error"*/
    scrollHistoryTableBodyToBottom();
}

function clearHistoryTable() {
    while (rowsCount > 0) {
        $("#historyRow" + (rowsCount - 1)).remove();
        rowsCount--;
    }
    /*global scrollHistoryTableBodyToBottom*/
    /*eslint no-undef: "error"*/
    scrollHistoryTableBodyToBottom();
}

function addOnConcreteRecordButtonClickListener(i) {
    let concreteRecordButton = document.getElementById("iconOnHistoryRow" + i.toString());
    concreteRecordButton.onclick = function () {
        for (let j = rowsCount - 1; j >= i; j--) {
            undoHistoryRecordsAddition();
        }
    }
}

/**
 * Enables or disables an element (e.g. a button) by adding a disabled class. Does nothing if buttonId is not a string.
 * @param buttonId - a string - Id of the button to enable or disable, without the number (#) sign
 * @param toEnable - a boolean variable, when true - removes "disabled" class, if specified.
 *                   Otherwise adds "disabled" class. (Is true by default)
 *
 * See https://www.w3schools.com/bootstrap/bootstrap_buttons.asp & http://api.jquery.com/removeClass/ for reference.
 */
function enableOrDisableAnElementById(buttonId, toEnable = true) {
    if (!(typeof buttonId === "string" || buttonId instanceof String)) {
        return;
    }

    if (toEnable) {
        $("#" + buttonId).removeClass("disabled");
    } else {
        $("#" + buttonId).addClass("disabled");
    }
}

/**
 * Makes visible or hides an element (e.g. a button) by removing or adding a hidden class.
 * Does nothing if buttonId is not a string.
 * @param buttonId - a string - Id of the button to enable or disable, without the number (#) sign
 * @param toMakeVisible - a boolean variable, when true - removes "hidden" class, if specified.
 *                   Otherwise adds "hidden" class. (Is true by default)
 *
 * See https://www.w3schools.com/bootstrap/bootstrap_buttons.asp & http://api.jquery.com/removeClass/ for reference.
 */
function makeVisibleOrHideAnElementById(buttonId, toMakeVisible = true) {
    if (!(typeof buttonId === "string" || buttonId instanceof String)) {
        return;
    }

    if (toMakeVisible) {
        $("#" + buttonId).removeClass("hidden");
    } else {
        $("#" + buttonId).addClass("hidden");
    }
}

function translateBlocksTitles() {
    let beginH3tag = "<h3 class=\"panel-title\">";
    let endH3tag = "</h3>";
    document.getElementById("label-parameters-block-title").innerHTML = beginH3tag + activeLanguage.labelParameters +
        endH3tag;
    document.getElementById("history-block-title").innerHTML = beginH3tag + activeLanguage.history + endH3tag;
    document.getElementById("minimap-block-title").innerHTML = beginH3tag + activeLanguage.miniMap + endH3tag;
}

function displayLanguageSelection(languagesArray) {
    let languageSelectionBlockCode = [];
    $("#language-selection-sidebar").removeClass("hidden");
    languageSelectionBlockCode.push("<select class=\"form-control\" id=\"language-selection-select\">");
    for (let i = 0; i < languagesArray.length; i++) {
        if (languagesArray[i].hasOwnProperty("getLanguageName")) {
            languageSelectionBlockCode.push("<option ");
            languageSelectionBlockCode.push("value=\"");
            languageSelectionBlockCode.push(i);
            languageSelectionBlockCode.push("\">");
            languageSelectionBlockCode.push(languagesArray[i].getLanguageName());
            languageSelectionBlockCode.push("</option>");
        }
    }
    languageSelectionBlockCode.push("</select>");
    document.getElementById("language-selection-sidebar").innerHTML = languageSelectionBlockCode.join("");
    document.getElementById("language-selection-select").addEventListener("change", function () {
        selectLanguage(languagesArray[document.getElementById("language-selection-select").value])
    }, false);
}
