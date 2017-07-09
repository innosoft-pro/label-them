/**
 * Created by alnedorezov on 5/26/17.
 */
function initPolygon() {
    function handleClicksOnSvgWithPolygonTool() {
        svgImgOnClick(event);
    }

    function handleKeydown(event) {
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
            if (event.shiftKey) {
                redoLastPoint();
            } else {
                undoLastPoint();
            }
        }
    }

    function handleContextMenu(event) {
        // console.log(event);
        event.returnValue = false;
        svgImgCancelPolygon();
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
                        svgImg.addEventListener("click", handleClicksOnSvgWithPolygonTool, false);
                        svgImg.addEventListener("contextmenu", handleContextMenu, true);
                        window.addEventListener("keydown", handleKeydown, true);

                    } else {
                        console.log("polygon disabled");
                        svgImg.removeEventListener("click", handleClicksOnSvgWithPolygonTool, false);
                        svgImg.removeEventListener("contextmenu", handleContextMenu, true);
                        window.removeEventListener("keydown", handleKeydown, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_polygon"
        });
    };
}
