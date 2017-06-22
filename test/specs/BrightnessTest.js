var assert = require('assert');
let projectFolderName = "git";
describe('webdriver.io page', function () {
    it("Should change image brightness from 100 to 90", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        browser.click("#btn_brightness_low");

        var result = browser.execute("return defaultBrightness;")
        console.log("Brightness: " + result.value);

        assert.equal(result.value, 90);
    });

    it("Should change image brightness from 100 to 110", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        browser.click("#btn_brightness_high");

        var result = browser.execute("return defaultBrightness;")
        console.log("Brightness: " + result.value);

        assert.equal(result.value, 110);
    });

    it("Should check that brightness cannot be less than 10", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        for (var i = 0; i < 11; i++) {
            browser.click("#btn_brightness_low");
        }

        var result = browser.execute("return defaultBrightness;")
        console.log("Brightness: " + result.value);

        assert.equal(result.value, 10);
    });

    it("Should check that brightness cannot be more than 500", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        for (var i = 0; i < 41; i++) {
            browser.click("#btn_brightness_high");
        }

        var result = browser.execute("return defaultBrightness;")
        console.log("Brightness: " + result.value);
        assert.equal(result.value, 500);
    });
}); 