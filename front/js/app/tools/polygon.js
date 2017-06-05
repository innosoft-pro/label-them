/**
 * Created by alnedorezov on 5/26/17.
 */
function initPolygon() {
    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.polygon = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        console.log("polygon enabled");
                        svgImg.addEventListener("click", handleClicksOnSvgWithPolygonTool, true);
                    } else {
                        console.log("polygon disabled");
                        svgImg.removeEventListener("click", handleClicksOnSvgWithPolygonTool, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_polygon"
        });
    };

    function handleClicksOnSvgWithPolygonTool() {
        svgImgOnClick(event);
    }
}