/**
 * Created by alnedorezov on 7/11/17.
 */
let assert = require('assert');
let projectFolderName = "git";
describe("webdriver.io page", function () {
    it("should be able to scale images (case 10)", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        browser.windowHandleSize({width: 1920, height: 1080});

        let error = 2;
        let points = [[100, 100], [100, 200], [200, 100], [200, 200]];
        let initialMainCanvasWidth;
        let initialMainCanvasHeight;
        let initialSvgImgWidth;
        let initialSvgImgHeight;
        let mainCanvasWidth;
        let mainCanvasHeight;
        let svgImgWidth;
        let svgImgHeight;

        // Step 0: Polygon tool is selected by default

        // Step 1: Label {(100, 100), (100, 200), (200, 100), (200, 200)} polygon.
        // 1.1. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        // 1.2. left click on the 100, 200 pixel of the image
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        // 1.3. left click on the 200, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        // 1.4. 1eft click on the 200, 200 pixel of the image
        browser.leftClick("#canvas-parent", points[3][0], points[3][1]);
        // 1.5. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

        // Step 2: Save width and height of #main-canvas and #svg_img blocks
        initialMainCanvasWidth = browser.execute("return document.getElementById(\"main-canvas\").width;").value;
        initialMainCanvasHeight = browser.execute("return document.getElementById(\"main-canvas\").height;").value;
        initialSvgImgWidth = browser.execute("return document.getElementById(\"svg_img\").style.width;").value;
        initialSvgImgWidth = Math.floor(initialSvgImgWidth.slice(0, initialSvgImgWidth.length-2));
        initialSvgImgHeight = browser.execute("return document.getElementById(\"svg_img\").style.height;").value;
        initialSvgImgHeight = Math.floor(initialSvgImgHeight.slice(0, initialSvgImgHeight.length-2));

        // Step 3: Click btn_zoom_out button
        browser.click("#btn_zoom_out");

        // Step 4: Check that current width and height of #main-canvas and
        // #svg_img blocks are equal to their saved values
        mainCanvasWidth = browser.execute("return document.getElementById(\"main-canvas\").width;").value;
        mainCanvasHeight = browser.execute("return document.getElementById(\"main-canvas\").height;").value;
        svgImgWidth = browser.execute("return document.getElementById(\"svg_img\").style.width;").value;
        svgImgWidth = Math.floor(svgImgWidth.slice(0, svgImgWidth.length-2));
        svgImgHeight = browser.execute("return document.getElementById(\"svg_img\").style.height;").value;
        svgImgHeight = Math.floor(svgImgHeight.slice(0, svgImgHeight.length-2));
        assert.deepStrictEqual(initialMainCanvasWidth, mainCanvasWidth);
        assert.deepStrictEqual(initialMainCanvasHeight, mainCanvasHeight);
        assert.deepStrictEqual(initialSvgImgWidth, svgImgWidth);
        assert.deepStrictEqual(initialSvgImgHeight, svgImgHeight);
    });
});