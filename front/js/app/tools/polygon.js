/**
 * Created by alnedorezov on 5/26/17.
 */
function initPolygon() {
    Tool.polygon = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        console.log("polygon enabled");
                        svgImg.onclick = function () {
                            /*global svgImgOnClick*/
                            /*eslint no-undef: "error"*/
                            svgImgOnClick(event);
                        };
                    } else {
                        console.log("polygon disabled");
                        /*global clearOnClick*/
                        /*eslint no-undef: "error"*/
                        svgImg.onclick = "";
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_polygon"
        });
    };
}