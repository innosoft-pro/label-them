let assert = require("assert");
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("Should be able to delete selected polygons", function () {
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }
        
        let error = 2;
        let points1 = [[100, 100], [100, 200], [200, 100]];

        //Click on canvas
        browser.leftClick("#canvas-parent", points1[0][0], points1[0][1]);
        browser.leftClick("#canvas-parent", points1[1][0], points1[1][1]);
        browser.leftClick("#canvas-parent", points1[2][0], points1[2][1]);
        browser.leftClick("#canvas-parent", points1[0][0], points1[0][1]);

        //Select object class
        let selectBox = $(".class-param");
        selectBox.selectByValue("class 0");

        //Set bool param to true
        let checkBox = $(".bool-param");
        checkBox.click();

        let points2 = [[300, 300], [300, 400], [400, 300]];

        browser.leftClick("#canvas-parent", points2[0][0], points2[0][1]);
        browser.leftClick("#canvas-parent", points2[1][0], points2[1][1]);
        browser.leftClick("#canvas-parent", points2[2][0], points2[2][1]);
        browser.leftClick("#canvas-parent", points2[0][0], points2[0][1]);

        //Select object class
        selectBox = $(".class-param");
        selectBox.selectByValue("class 1");

        let points3 = [[50, 50], [50, 75], [75, 50]];

        browser.leftClick("#canvas-parent", points3[0][0], points3[0][1]);
        browser.leftClick("#canvas-parent", points3[1][0], points3[1][1]);
        browser.leftClick("#canvas-parent", points3[2][0], points3[2][1]);
        browser.leftClick("#canvas-parent", points3[0][0], points3[0][1]);

        //Select object class
        selectBox = $(".class-param");
        selectBox.selectByValue("class 1");

        //Set bool param to true
        checkBox = $(".bool-param");
        checkBox.click();

        browser.leftClick(".btn-hand");

        browser.leftClick("#canvas-parent", 55, 55);
        // browser.pause(2000);
        browser.keys(['Backspace', 'NULL']);

        browser.leftClick("#canvas-parent", 320, 320);
        // browser.pause(2000);
        browser.keys(['Delete', 'NULL']);

        browser.leftClick(".btn-save");

        function matchPointArrays(arr1, arr2, error) {
            let result = true;
            assert.deepStrictEqual(arr1.length, arr2.length);

            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < 2; j++) {
                    let difference = Math.abs(arr1[i][j] - (arr2[i][j]));
                    if (difference > error) {
                        result = false;
                    }
                    assert.ok(difference <= error);
                }
            }
            return result;
        }

        function matchParamsDict(dict1, dict2) {
            return JSON.stringify(dict1) === JSON.stringify(dict2);
        }

        let finalArr1 = [[100,100],[100,200],[200,100]];
        let finalParams = {"class":"class 0","is occluded":true};

        let result = browser.execute("return outputJson;");
        result = JSON.parse(result.value);
        assert.ok(matchPointArrays(result[0].points, finalArr1, 2));
        assert.ok(matchParamsDict(result[0].parameters, finalParams, 2));
    });
});
