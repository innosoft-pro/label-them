/**
 * Created by alnedorezov on 5/26/17.
 */
function initPolygon() {

    this.ctrlPressed = false;

    function handleClicksOnSvgWithPolygonTool() {
        svgImgOnClick(event);
    }

    function handleKeydown(event) {
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 90) {

            if (event.shiftKey) {
                redoLastPoint();
            } else {
                undoLastPoint();
            }
            console.log(event);

        }

    }

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
                        window.addEventListener("keydown", handleKeydown, true);
                    } else {
                        console.log("polygon disabled");
                        svgImg.removeEventListener("click", handleClicksOnSvgWithPolygonTool, true);
                        window.removeEventListener("keydown", handleKeydown, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_polygon"
        });
    };
}
