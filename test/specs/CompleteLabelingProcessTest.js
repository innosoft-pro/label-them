let assert = require("assert");
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("Should label image", function () {
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        let error = 2;
        let points = [[100, 100], [100, 200], [200, 100]];

        //Click on canvas
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

        //Select object class
        let selectBox = $(".class-param");
        selectBox.selectByValue("class 0");

        //Set bool param to true
        let checkBox = $(".bool-param");
        checkBox.click();

        //Save the result
        browser.leftClick(".btn-save");

        //Get outputJson
        let result = browser.execute("return outputJson;");

        let json = result.value.substring(0, result.value.length - 1);
        json = json.substring(1, result.value.length);
        let jsonResponse = JSON.parse(json);
        let results = [];

        for (let i = 0; i < jsonResponse.points.length; i++) {
            for (let j = 0; j < 2; j++) {
                let difference = Math.abs(jsonResponse.points[i][j] - points[i][j]);
                results.push(difference <= error);
            }
        }

        results.forEach(function (obj) {
            assert.equal(obj, true);
        });
    });

    it("Should label image without saving", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        let error = 2;
        let points = [[100, 100], [100, 200], [200, 100]];

        //Click on canvas
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

        //Select object class
        let selectBox = $(".class-param");
        selectBox.selectByValue("class 0");

        //Set bool param to true
        let checkBox = $(".bool-param");
        checkBox.click();

        //Get outputJson
        let result = browser.execute("return outputJson;");

        let json = result.value.substring(0, result.value.length - 1);
        json = json.substring(1, result.value.length);
        let jsonResponse = JSON.parse(json);
        let results = [];

        for (let i = 0; i < jsonResponse.points.length; i++) {
            for (let j = 0; j < 2; j++) {
                let difference = Math.abs(jsonResponse.points[i][j] - points[i][j]);
                results.push(difference <= error);
            }
        }

        results.forEach(function (obj) {
            assert.equal(obj, true);
        });
    });
});
