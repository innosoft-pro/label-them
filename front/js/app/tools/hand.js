/**
 * Created by alnedorezov on 5/26/17.
 */
function initHand() {
    Tool.hand = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        console.log("hand enabled");
                        svgImg.addEventListener("click", handleClicksOnSvgWithHandTool, true);
                    } else {
                        console.log("hand disabled");
                        svgImg.removeEventListener("click", handleClicksOnSvgWithHandTool, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_hand"
        });
    };

    function handleClicksOnSvgWithHandTool() {
        svgImgOnClickSelect(event);
    }
}