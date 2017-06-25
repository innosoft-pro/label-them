var assert = require('assert');
let projectFolderName = "label-them";
describe('webdriver.io page', function () {
    it("Should change image brightness", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');

        //Click on canvas
        browser.leftClick("#canvas-parent", 100, 100);
        browser.leftClick("#canvas-parent", 100, 200);
        browser.leftClick("#canvas-parent", 200, 100);
        browser.leftClick("#canvas-parent", 100, 100);

        //Select object class
        var selectBox = $(".class-param");
        selectBox.selectByValue("Brown Bear");
        console.log("Chosen class: " + selectBox.getValue());

        //Set bool param to true
        var checkBox = $(".bool-param");
        checkBox.click();

        //Save the result
        browser.leftClick(".btn-save");

        //Get outputJson
        var result = browser.execute("return outputJson;");
        console.log(result.value);

        //Assertion
        assert.equal(result.value, "[{\"points\":[[99,109.39999389648438],[99,209.39999389648438],[199,109.39999389648438]],\"parameters\":{\"class\":\"Brown Bear\",\"is scary\":true}}]");
    });
});