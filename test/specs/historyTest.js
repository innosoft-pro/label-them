/**
 * Created by alnedorezov on 7/14/17.
 */
// See https://github.com/innosoft-pro/label-them/wiki/Test-cases#case-10 for the summary
// description of this case steps

let assert = require('assert');
let projectFolderName = "git";
describe("webdriver.io page", function () {
    it("should contain a functional history block (case 11)", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        // Step 0: Polygon tool is selected by default

        let error = 2;
        let outputJson;
        let checkedHistoryRowElement;

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

            for(let i=0; i<json1.length; i++) {
                pointsArray1 = json1[i].points;
                pointsArray2 = json2[i].points;
                assert.deepStrictEqual(pointsArray1.length, pointsArray2.length);
                if (pointsArray1.length !== pointsArray2.length) {
                    result = false;
                    return result;
                }

                for (let i = 0; i < pointsArray1.length; i++) {
                    for (let j = 0; j < 2; j++) {
                        let difference = Math.abs(pointsArray1[i][j] - (pointsArray2[i][j] * scalingFactor));
                        if (difference > error) {
                            result = false;
                        }
                        assert.ok(difference <= error);
                    }
                }
            }

            parameters1 = json1[i].parameters;
            parameters2 = json2[i].parameters;
            assert.deepStrictEqual(parameters1, parameters2);
            if(JSON.stringify(parameters1) !== JSON.stringify(parameters2)) {
                result = false;
                return result;
            }

            return result;
        }

        // Step 1: Check that historyRow0 DOM element does not exist
        checkedHistoryRowElement = browser.execute("return document.getElementById(\"historyRow0\");").value;
        assert.equal(checkedHistoryRowElement, null);


    });
});