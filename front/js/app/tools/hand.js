/**
 * Created by alnedorezov on 5/26/17.
 */
function initHand() {
    function handleClicksOnSvgWithHandTool() {
        svgImgOnClickSelect(event);
    }

    function handleKeyUp(event) {
        if (event.keyCode === 8 || event.keyCode === 46) {
            svgImgDeleteSelectedPolygon();
        }
    }

    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.hand = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        console.log("hand enabled");
                        svgImg.addEventListener("click", handleClicksOnSvgWithHandTool, true);
                        window.addEventListener("keyup", handleKeyUp, true);
                    } else {
                        console.log("hand disabled");
                        svgImg.removeEventListener("click", handleClicksOnSvgWithHandTool, true);
                        window.removeEventListener("keyup", handleKeyUp, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_hand"
        });
    };
}
