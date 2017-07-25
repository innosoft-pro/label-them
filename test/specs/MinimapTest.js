let assert = require('assert');
let projectFolderName = "label-them";
describe('webdriver.io page', function () {
    it("Should scroll main canvas on minimap click", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        let canvasParent = browser.elements("#canvas-parent");

        //1. Click zoom in to scale image so even small image is not able to fit main canvas
        browser.click("#btn_zoom_in");

        //2. Find the current value of main canvas scroll
        let scrollValue = browser.execute("return $(\"#canvas-parent\").scrollLeft()");

        let points = [[100, 100]];

        //3. Click on minimap
        browser.leftClick("#minimap_canvas", points[0][0], points[0][1]);

        //4. Find a new value of main canvas scroll
        let newScrollValue = browser.execute("return $(\"#canvas-parent\").scrollLeft()");

        //5. Check if scroll value has changed after click on the minimap
        assert.equal(scrollValue.value != newScrollValue.value, true);
    });
}); 