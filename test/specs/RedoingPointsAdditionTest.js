var assert = require("assert");
browser.leftClick("#canvas-parent", 100, 100);
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("Undoing points addition during objects markup", function () {
        /*global browser*/
        /*eslint no-undef: "error"*/
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }
        // Step 1
        browser.leftClick("#canvas-parent", 100, 100);
        browser.leftClick("#canvas-parent", 100, 200);
        browser.leftClick("#canvas-parent", 200, 100);
        browser.leftClick("#canvas-parent", 200, 200);
        browser.leftClick("#canvas-parent", 150, 150);

        // Step 2
        browser.keys(['Control', 'z']);

        // Step 3
        browser.keys(['Control', 'z']);

        // Step 4
        browser.keys(['Control', 'Shift', 'z']);

        // Step 5
        browser.leftClick("#canvas-parent", 100, 100);

        // Step 6
        browser.click("#btn_save");

        // Get outputJson
        var result = browser.execute("return outputJson;");

        var pointsTemp = [[[100, 100], [100, 200], [200, 100]]];
        let error = 2;
        let jsonResponse = JSON.parse(result.value);
        let results = [];

        for (let k = 0; k < jsonResponse.length; k++) {
            let points = jsonResponse[k].points;
            let tempPoints = pointsTemp[k];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    let difference = Math.abs(points[i][j] - tempPoints[i][j]);
                    results.push(difference <= error);
                }
            }
        }
        results.forEach(function (obj) {
            assert.equal(obj, true);
        });
    });
});