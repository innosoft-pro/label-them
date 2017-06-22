var assert = require('assert');
describe('webdriver.io page', function () {
    it("Should change image brightness", function () {
        browser.url('http://localhost:63342/label-them/front/main_local.html');

        //Click on canvas
        browser.leftClick(".btn-save", 500, 500);
        browser.leftClick(".btn-save", 400, 500);
        browser.leftClick(".btn-save", 500, 400);
        browser.leftClick(".btn-save", 500, 500);

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
        assert.equal(result.value, "[{\"points\":[[395,392],[295,392],[395,292]],\"parameters\":{\"class\":\"Brown Bear\",\"is scary\":true}}]");
    });
});