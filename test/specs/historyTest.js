/**
 * Created by alnedorezov on 7/14/17.
 */
// See https://github.com/innosoft-pro/label-them/wiki/Test-cases#case-10 for the summary
// description of this case steps

let assert = require("assert");
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("should contain a functional history block (case 11)", function () {
        /*global browser*/
        /*eslint no-undef: "error"*/
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        // Step 0: Polygon tool is selected by default

        let error = 2;
        let outputJson;
        let checkedHistoryRowElement;
        let pointsForStep2 = [[100, 100], [100, 200], [200, 100]];
        let pointsForStep10 = [[300, 300], [300, 400], [400, 300]];
        let goldenJsonString;
        let classSelectBox = $(".class-param");
        let isOccludedCheckBox = $(".bool-param");
        let selectAnOptionSelect = $(".select-param");
        let checkedValue;

        function compareTwoJSONsWithMarkup(jsonString1, jsonString2, error) {
            let json1 = JSON.parse(jsonString1);
            let json2 = JSON.parse(jsonString2);
            let result = true;
            let pointsArray1, pointsArray2;
            let parameters1, parameters2;

            assert.deepStrictEqual(json1.length, json2.length);
            if (json1.length !== json2.length) {
                result = false;
                return result;
            }

            for(let k=0; k<json1.length; k++) {
                pointsArray1 = json1[k].points;
                pointsArray2 = json2[k].points;
                assert.deepStrictEqual(pointsArray1.length, pointsArray2.length);
                if (pointsArray1.length !== pointsArray2.length) {
                    result = false;
                    return result;
                }

                for (let i = 0; i < pointsArray1.length; i++) {
                    for (let j = 0; j < 2; j++) {
                        let difference = Math.abs(pointsArray1[i][j] - pointsArray2[i][j]);
                        if (difference > error) {
                            result = false;
                        }
                        assert.ok(difference <= error);
                    }
                }

                parameters1 = json1[k].parameters;
                parameters2 = json2[k].parameters;
                assert.deepStrictEqual(parameters1, parameters2);
                if(JSON.stringify(parameters1) !== JSON.stringify(parameters2)) {
                    result = false;
                    return result;
                }
            }

            return result;
        }

        // Step 1: Check that historyRow0 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow0\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 2: Label {(100, 100), (100, 200), (200, 100)} polygon.
        // 2.1. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep2[0][0], pointsForStep2[0][1]);
        // 2.2. left click on the 100, 200 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep2[1][0], pointsForStep2[1][1]);
        // 2.3. left click on the 200, 100 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep2[2][0], pointsForStep2[2][1]);
        // 2.4. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep2[0][0], pointsForStep2[0][1]);

        // Step 3: Check that historyRow0 DOM element exists and contains
        // a string “Polygon was added and assigned an id 0”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow0\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon was added and assigned an id 0"));

        // Step 4: Select object class “class 0”
        classSelectBox.selectByValue("class 0");

        // Step 5: Check that historyRow1 DOM element exists and contains
        // a string “Class of polygon 0 was changed to class 0”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow1\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Class of polygon 0 was changed to class 0"));

        // Step 6: Check “is occluded” boolean parameter
        isOccludedCheckBox.click();

        // Step 7: Check that historyRow2 DOM element exists and contains
        // a string “Parameter is occluded of polygon 0 was changed to true”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow2\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Parameter is occluded of polygon 0 was changed to true"));

        // Step 8: Select “option 1 name” option of “select an option” select parameter
        selectAnOptionSelect.selectByValue("option 1 name");

        // Step 9: Check that historyRow3 DOM element exists and contains
        // a string “Parameter select an option of polygon 0 was changed to option 1 name”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow3\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Parameter select an option " +
            "of polygon 0 was changed to option 1 name"));

        // Step 10: Label {(300, 300), (300, 400), (400, 300)} polygon.
        // 10.1. left click on the 300, 300 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep10[0][0], pointsForStep10[0][1]);
        // 10.2. left click on the 300, 400 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep10[1][0], pointsForStep10[1][1]);
        // 10.3. left click on the 400, 300 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep10[2][0], pointsForStep10[2][1]);
        // 10.4. left click on the 300, 300 pixel of the image
        browser.leftClick("#canvas-parent", pointsForStep10[0][0], pointsForStep10[0][1]);

        // Step 11: Check that historyRow4 DOM element exists and contains
        // a string “Polygon was added and assigned an id 1”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow4\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon was added and assigned an id 1"));

        // Step 12: - // Removed in the releases after 1.4

        // Step 13: Left click on the image on (105, 120) point
        browser.leftClick("#canvas-parent", 105, 120);

        // Step 14: Click [Delete] button
        browser.keys(['Delete', 'NULL']);

        // Step 15: Check that historyRow5 DOM element exists and contains
        // a string “Polygon with id 0 was deleted”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow5\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon with id 0 was deleted"));

        // Step 16: Left click on the image on (305, 320) point
        browser.leftClick("#canvas-parent", 305, 320);

        // Step 17: Select object class “class 0”
        classSelectBox.selectByValue("class 0");

        // Step 18: Check that historyRow6 DOM element exists and contains
        // a string “Class of polygon 1 was changed to class 0”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow6\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Class of polygon 1 was changed to class 0"));

        // Step 19: Compare returned JSON markup to [{\"points\":[[300,300],[300,400],[400,300]],
        // \"parameters\":{\"class\":\"class 0\"}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{\"class\":\"class 0\"}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 20: Click “Undo” button (#delete-row)
        browser.click("#delete-row");

        // Step 21: Check that historyRow6 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow6\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 22: Compare returned JSON markup to
        // [{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 23: Click “Undo” button (#delete-row)
        browser.click("#delete-row");

        // Step 24: Check that historyRow5 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow5\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 25: Compare returned JSON markup to [{\"points\":[[100,100],[100,200],[200,100]],
        // \"parameters\":{\"class\":\"class 0\",\"is occluded\":true,
        // \"select an option\":\"option 1 name\"}},
        // {\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[100,100],[100,200],[200,100]]," +
            "\"parameters\":{\"class\":\"class 0\",\"is occluded\":true," +
            "\"select an option\":\"option 1 name\"}}, " +
            "{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 26: Click “Undo” button (#delete-row)
        browser.click("#delete-row");

        // Step 27: Check that historyRow4 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow4\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 28: Compare returned JSON markup to
        // [{\"points\":[[100,100],[100,200],[200,100]],
        // \"parameters\":{\"class\":\"class 0\",\"is occluded\":true,
        // \"select an option\":\"option 1 name\"}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[100,100],[100,200],[200,100]]," +
            "\"parameters\":{\"class\":\"class 0\"," +
            "\"is occluded\":true,\"select an option\":\"option 1 name\"}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 29: Click “Undo” button (#delete-row)
        browser.click("#delete-row");

        // Step 30: Check that historyRow3 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow3\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 31: Compare returned JSON markup to
        // [{\"points\":[[100,100],[100,200],[200,100]],
        // \"parameters\":{\"class\":\"class 0\",\"is occluded\":true}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[100,100],[100,200],[200,100]]," +
            "\"parameters\":{\"class\":\"class 0\",\"is occluded\":true}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 32: Click “Redo” button (#add-row)
        browser.click("#add-row");

        // Step 33: Check that historyRow3 DOM element exists and contains
        // a string “Parameter select an option of polygon 0 was changed to option 1 name”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow3\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Parameter select an option " +
            "of polygon 0 was changed to option 1 name"));

        // Step 34: Compare returned JSON markup to
        // [{\"points\":[[100,100],[100,200],[200,100]],
        // \"parameters\":{\"class\":\"class 0\",\"is occluded\":true,
        // \"select an option\":\"option 1 name\"}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[100,100],[100,200],[200,100]]," +
            "\"parameters\":{\"class\":\"class 0\",\"is occluded\":true," +
            "\"select an option\":\"option 1 name\"}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 35: Click “Redo” button (#add-row)
        browser.click("#add-row");

        // Step 36: Check that historyRow4 DOM element exists and contains a string “Polygon was added and assigned an id 1”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow4\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon was added and assigned an id 1"));

        // Step 37: Compare returned JSON markup to [{\"points\":[[100,100],[100,200],[200,100]],
        // \"parameters\":{\"class\":\"class 0\",\"is occluded\":true,
        // \"select an option\":\"option 1 name\"}}, {\"points\":[[300,300],[300,400],[400,300]],
        // \"parameters\":{}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[100,100],[100,200],[200,100]]," +
            "\"parameters\":{\"class\":\"class 0\",\"is occluded\":true," +
            "\"select an option\":\"option 1 name\"}}, " +
            "{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 38: Click “Redo” button (#add-row)
        browser.click("#add-row");

        // Step 39: Check that historyRow5 DOM element exists and contains a string “Polygon with id 0 was deleted”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow5\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon with id 0 was deleted"));

        // Step 40: Compare returned JSON markup to
        // [{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 41: Click “Redo” button (#add-row)
        browser.click("#add-row");

        // Step 42: Check that historyRow6 DOM element exists and contains a string “Class of polygon 1 was changed to class 0”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow6\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Class of polygon 1 was changed to class 0"));

        // Step 43: Compare returned JSON markup to
        // [{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{\"class\":\"class 0\"}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]]," +
            "\"parameters\":{\"class\":\"class 0\"}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 44: Click “iconOnHistoryRow6” button (#iconOnHistoryRow6)
        browser.click("#iconOnHistoryRow6");

        // Step 45: Check that historyRow6 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow6\");").value;
        assert.equal(checkedHistoryRowElement, null);

        // Step 46: Check that historyRow5 DOM element exists and contains
        // a string “Polygon with id 0 was deleted”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow5\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Polygon with id 0 was deleted"));

        // Step 47: Compare returned JSON markup to [{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 48: Check that #delete-row DOM element does not contain class “disabled”
        checkedValue = browser.execute("return $(\"#delete-row\").hasClass(\"disabled\");").value;
        assert.equal(checkedValue, false);

        // Step 49: Left click on the image on (305, 320) point
        browser.leftClick("#canvas-parent", 305, 320);

        // Step 50: Select object class “class 1”
        classSelectBox.selectByValue("class 1");

        // Step 51: Check that historyRow6 DOM element exists and contains a string “Class of polygon 1 was changed to class 1”
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow6\").innerText;").value;
        assert.ok(checkedHistoryRowElement.includes("Class of polygon 1 was changed to class 1"));

        // Step 52: Compare returned JSON markup to
        // [{\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{\"class\":\"class 1\"}}]
        outputJson = browser.execute("return outputJson;").value;
        goldenJsonString = "[{\"points\":[[300,300],[300,400],[400,300]]," +
            "\"parameters\":{\"class\":\"class 1\"}}]";
        assert.ok(compareTwoJSONsWithMarkup(outputJson, goldenJsonString, error));

        // Step 53: Check that #delete-row DOM element does not contain class “disabled”
        checkedValue = browser.execute("return $(\"#delete-row\").hasClass(\"disabled\");").value;
        assert.equal(checkedValue, false);

        // Step 54: Check that #add-row DOM element does contain class “disabled”
        checkedValue = browser.execute("return $(\"#add-row\").hasClass(\"disabled\");").value;
        assert.equal(checkedValue, true);
    });
});