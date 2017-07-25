/**
 * Created by alnedorezov on 7/11/17.
 */
let assert = require("assert");
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("should be able to scale images (case 10)", function () {
        /*global browser*/
        /*eslint no-undef: "error"*/
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        // See https://github.com/innosoft-pro/label-them/wiki/Test-cases#case-10 for the summary
        // description of this case steps

        // Step 0: Polygon tool is selected by default

        let error = 2;
        let outputJson;
        let points = [[65, 65], [65, 85], [85, 85], [85, 65]];
        let pointsForStep7 = [[120, 120], [120, 180], [180, 180], [180, 120]];
        let pointsForStep10 = [[220, 220], [220, 380], [380, 380], [380, 220]];
        let pointsForStep13 = [[100, 100], [100, 200], [200, 200], [200, 100]];
        let mainCanvasWidth;
        let mainCanvasHeight;
        let svgImgWidth;
        let svgImgHeight;
        let scalingFactor;

        // Step 1: Save width and height of #main-canvas and #svg_img blocks
        let initialMainCanvasWidth = browser.execute("return document.getElementById(\"main-canvas\").width;").value;
        let initialMainCanvasHeight = browser.execute("return document.getElementById(\"main-canvas\").height;").value;
        let initialSvgImgWidth = browser.execute("return document.getElementById(\"svg_img\").style.width;").value;
        initialSvgImgWidth = Math.floor(initialSvgImgWidth.slice(0, initialSvgImgWidth.length - 2));
        let initialSvgImgHeight = browser.execute("return document.getElementById(\"svg_img\").style.height;").value;
        initialSvgImgHeight = Math.floor(initialSvgImgHeight.slice(0, initialSvgImgHeight.length - 2));

        function mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor) {
            mainCanvasWidth = browser.execute("return document.getElementById(\"main-canvas\").width;").value;
            mainCanvasHeight = browser.execute("return document.getElementById(\"main-canvas\").height;").value;
            svgImgWidth = browser.execute("return document.getElementById(\"svg_img\").style.width;").value;
            svgImgWidth = Math.floor(svgImgWidth.slice(0, svgImgWidth.length - 2));
            svgImgHeight = browser.execute("return document.getElementById(\"svg_img\").style.height;").value;
            svgImgHeight = Math.floor(svgImgHeight.slice(0, svgImgHeight.length - 2));
            assert.deepStrictEqual(initialMainCanvasWidth * scalingFactor, mainCanvasWidth);
            assert.deepStrictEqual(initialMainCanvasHeight * scalingFactor, mainCanvasHeight);
            assert.deepStrictEqual(initialSvgImgWidth * scalingFactor, svgImgWidth);
            assert.deepStrictEqual(initialSvgImgHeight * scalingFactor, svgImgHeight);
            return initialMainCanvasWidth * scalingFactor === mainCanvasWidth &&
                initialMainCanvasHeight * scalingFactor === mainCanvasHeight &&
                initialSvgImgWidth * scalingFactor === svgImgWidth &&
                initialSvgImgHeight * scalingFactor === svgImgHeight;
        }

        function valuesInFirstArrayAreSimilarUpToTheSetErrorWithTheOnesInTheSecondArrayMultipliedByScalingFactor(pointsArray1, pointsArray2, scalingFactor, error) {
            let result = true;
            assert.deepStrictEqual(pointsArray1.length, pointsArray2.length);
            if (pointsArray1.length !== pointsArray2.length) {
                result = false;
                return result;
            }

            for (let i = 0; i < pointsArray1.length; i++) {
                for (let j = 0; j < 2; j++) {
                    let difference = Math.abs(pointsArray1[i][j] - (pointsArray2[i][j] * scalingFactor));
                    if (difference > error) {
                        result = false;
                    }
                    assert.ok(difference <= error);
                }
            }
            return result;
        }

        // Step 2: Label {(65, 65), (65, 85), (85, 85), (85, 65)}.
        // 2.1. left click on the 65, 65 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        // 2.2. left click on the 65, 85 pixel of the image
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        // 2.3. left click on the 85, 85 pixel of the image
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        // 2.4. left click on the 85, 65 pixel of the image
        browser.leftClick("#canvas-parent", points[3][0], points[3][1]);
        // 2.5. left click on the 65, 65 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

        // Step 3: Click btn_zoom_out button
        browser.click("#btn_zoom_out");

        // Step 4: Check that current width and height of #main-canvas and
        // #svg_img blocks are equal to their saved values
        scalingFactor = 1;
        assert.ok(mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor));

        // Step 5: Click btn_zoom_in button
        browser.click("#btn_zoom_in");

        // Step 6: Check that current width and height of #main-canvas and
        // #svg_img blocks are doubles of their saved values
        scalingFactor = 2;
        assert.ok(mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor));

        // Step 7 : Label {(60, 60), (60, 90), (90, 90), (90, 60)} polygon.
        // 7.1. left click on the 120, 120 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep7[0][0], pointsForStep7[0][1]);
        // 7.2. left click on the 120, 180 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep7[1][0], pointsForStep7[1][1]);
        // 7.3. left click on the 180, 180 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep7[2][0], pointsForStep7[2][1]);
        // 7.4. left click on the 180, 120 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep7[3][0], pointsForStep7[3][1]);
        // 7.5. left click on the 120, 120 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep7[0][0], pointsForStep7[0][1]);

        // Step 8: Click btn_zoom_in button
        browser.click("#btn_zoom_in");

        // Step 9: Check that current width and height of #main-canvas and
        // #svg_img blocks are equal to their saved values multiplied by 4
        scalingFactor = 4;
        assert.ok(mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor));

        // Step 10: Label {(55, 55), (55, 95), (95, 95), (95, 55)} polygon.
        // 10.1. left click on the 220, 220 pixel of the image // as image is low scaled to 4x
        browser.leftClick("#canvas-parent", pointsForStep10[0][0], pointsForStep10[0][1]);
        // 10.2. left click on the 220, 380 pixel of the image // as image is low scaled to 4x
        browser.leftClick("#canvas-parent", pointsForStep10[1][0], pointsForStep10[1][1]);
        // 10.3. left click on the 380, 380 pixel of the image // as image is low scaled to 4x
        browser.leftClick("#canvas-parent", pointsForStep10[2][0], pointsForStep10[2][1]);
        // 10.4. left click on the 380, 220 pixel of the image // as image is low scaled to 4x
        browser.leftClick("#canvas-parent", pointsForStep10[3][0], pointsForStep10[3][1]);
        // 10.5. left click on the 220, 220 pixel of the image // as image is low scaled to 4x
        browser.leftClick("#canvas-parent", pointsForStep10[0][0], pointsForStep10[0][1]);

        // Step 11: Click btn_zoom_out button
        browser.click("#btn_zoom_out");

        // Step 12: Check that current width and height of #main-canvas and
        // #svg_img blocks are doubles of their saved values
        scalingFactor = 2;
        assert.ok(mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor));

        // Step 13: Label {(50, 50), (50, 100), (50, 100), (100, 50)} polygon.
        // 13.1. left click on the 100, 100 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep13[0][0], pointsForStep13[0][1]);
        // 13.2. left click on the 100, 200 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep13[1][0], pointsForStep13[1][1]);
        // 13.3. left click on the 200, 200 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep13[2][0], pointsForStep13[2][1]);
        // 13.4. left click on the 200, 100 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep13[3][0], pointsForStep13[3][1]);
        // 13.5. left click on the 100, 100 pixel of the image // as image is low scaled to 2x
        browser.leftClick("#canvas-parent", pointsForStep13[0][0], pointsForStep13[0][1]);

        // Step 14: Click btn_zoom_out button
        browser.click("#btn_zoom_out");

        // Step 15: Check that current width and height of #main-canvas and
        // #svg_img blocks are equal to their saved values
        scalingFactor = 1;
        assert.ok(mainCanvasAndSvgImgSizesEqualToTheirInitialValuesMultipliedByScalingFactor(scalingFactor));

        // Step 16: Click save button
        browser.click("#btn_save");

        // Step 17: Compare returned JSON markup to
        // `[{\"points\":[[65,65],[65,85],[85,85],[85,65]],\"parameters\":{}},
        // {\"points\":[[60,60],[60,90],[90,90],[90,60]],\"parameters\":{}},
        // {\"points\":[[55,95],[55,95],[95,95],[95,55]],\"parameters\":{}},
        // {\"points\":[[50,50],[50,100],[100,100],[100,50]],\"parameters\":{}}]`

        //Get outputJson
        outputJson = browser.execute("return outputJson;").value;
        outputJson = JSON.parse(outputJson);

        scalingFactor = 1;
        assert.ok(valuesInFirstArrayAreSimilarUpToTheSetErrorWithTheOnesInTheSecondArrayMultipliedByScalingFactor(
            points, outputJson[0].points, scalingFactor, error));
        scalingFactor = 2;
        assert.ok(valuesInFirstArrayAreSimilarUpToTheSetErrorWithTheOnesInTheSecondArrayMultipliedByScalingFactor(
            pointsForStep7, outputJson[1].points, scalingFactor, error));
        scalingFactor = 4;
        assert.ok(valuesInFirstArrayAreSimilarUpToTheSetErrorWithTheOnesInTheSecondArrayMultipliedByScalingFactor(
            pointsForStep10, outputJson[2].points, scalingFactor, error));
        scalingFactor = 2;
        assert.ok(valuesInFirstArrayAreSimilarUpToTheSetErrorWithTheOnesInTheSecondArrayMultipliedByScalingFactor(
            pointsForStep13, outputJson[3].points, scalingFactor, error));
    });
});