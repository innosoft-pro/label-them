let assert = require('assert');
let projectFolderName = "git";
describe('webdriver.io page', function () {
    it("Should redo the addition of the cancelled point", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');

        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        let error = 2;
        let points = [[100, 100], [100, 200], [200, 100], [200, 200], [150, 150]];

        //Click on canvas
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        browser.leftClick("#canvas-parent", points[3][0], points[3][1]);
        browser.leftClick("#canvas-parent", points[4][0], points[4][1]);

        browser.keys(['Control', 'z', 'NULL']);
        browser.keys(['Control', 'z', 'NULL']);
        browser.keys(['Control', 'Shift', 'z', 'NULL']);

        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

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

        let finalArr1 = [[100,100],[100,200],[200,100],[200,200]];

        let result = browser.execute("return outputJson;");
        result = JSON.parse(result.value);
        assert.ok(matchPointArrays(result[0].points, finalArr1, 2));
    });
});
