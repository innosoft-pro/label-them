var assert = require('assert');
let projectFolderName = "label-them";
describe('webdriver.io page', function () {
    it("Polygons selection and modification of classes and parameters of the selected polygon", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');

        // Step 1
        browser.leftClick("#canvas-parent", 100, 100);
        browser.leftClick("#canvas-parent", 100, 200);
        browser.leftClick("#canvas-parent", 200, 100);
        browser.leftClick("#canvas-parent", 100, 100);

        // Step 2
        var selectBox = $(".class-param");
        selectBox.selectByValue("Brown Bear");

        // Step 3
        var checkBox = $(".bool-param");
        checkBox.click();

        // Step 4
        browser.leftClick("#canvas-parent", 300, 300);
        browser.leftClick("#canvas-parent", 300, 400);
        browser.leftClick("#canvas-parent", 400, 300);
        browser.leftClick("#canvas-parent", 300, 300);


        // Step 5
        selectBox.selectByValue("Grizzly");

        // Step 6 checkbox's default value is false
        // checkBox.click();

        // Step 7
        browser.click("#btn_hand");

        // Step 8
        browser.leftClick("#canvas-parent", 120, 120);

        // Step 9
        checkBox.click();

        // Step 10
        browser.leftClick("#canvas-parent", 320, 320);

        // Step 11
        selectBox.selectByValue("Brown Bear");

        // Step 12
        checkBox.click();

        // Step 13
        browser.click("#btn_save");

        // Get outputJson
        var result = browser.execute("return outputJson;");
        console.log(result.value);

        // Assertion
        assert.equal(result.value, "[{\"points\":[[100,100],[100,200],[200,100]],\"parameters\":{\"class\":\"Brown Bear\",\"is scary\":false}}, {\"points\":[[300,300],[300,400],[400,300]],\"parameters\":{\"class\":\"Brown Bear\",\"is scary\":true}}]");
    });
});