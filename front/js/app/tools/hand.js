/**
 * Created by alnedorezov on 5/26/17.
 */
function initHand() {
    Tool.hand = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        svgImg.onclick = function () {
                            /*global svgImgOnClickSelect*/
                            /*eslint no-undef: "error"*/
                            svgImgOnClickSelect(event);
                        };
                    } else {
                        /*global clearOnClick*/
                        /*eslint no-undef: "error"*/
                        svgImg.onclick="";
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_hand"
        });
    };
}