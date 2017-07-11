let assert = require('assert');
let projectFolderName = "git";
describe('webdriver.io page', function () {
    it("Should cancel adding a new polygon on right mouse click", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');

        let error = 2;
        let points1 = [[100, 100], [100, 200], [200, 100]];

        //Click on canvas
        browser.leftClick("#canvas-parent", points1[0][0], points1[0][1]);
        browser.leftClick("#canvas-parent", points1[1][0], points1[1][1]);
        browser.leftClick("#canvas-parent", points1[2][0], points1[2][1]);
        browser.leftClick("#canvas-parent", points1[0][0], points1[0][1]);

        let points2 = [[300, 300], [300, 400], [400, 300]];

        browser.leftClick("#canvas-parent", points2[0][0], points2[0][1]);
        browser.leftClick("#canvas-parent", points2[1][0], points2[1][1]);
        browser.leftClick("#canvas-parent", points2[2][0], points2[2][1]);

        // Cancel the polygon
        browser.rightClick("#canvas-parent");


        let points3 = [[50, 50], [50, 75], [75, 50]];

        browser.leftClick("#canvas-parent", points3[0][0], points3[0][1]);
        browser.leftClick("#canvas-parent", points3[1][0], points3[1][1]);
        browser.leftClick("#canvas-parent", points3[2][0], points3[2][1]);
        browser.leftClick("#canvas-parent", points3[0][0], points3[0][1]);

        browser.leftClick(".btn-save");

        let result = browser.execute("return outputJson;");
        assert.equal(result.value, "[{\"points\":[[100,100],[100,200],[200,100]],\"parameters\":{}},{\"points\":[[50,50],[50,75],[75,50]],\"parameters\":{}}]");
    });
});
