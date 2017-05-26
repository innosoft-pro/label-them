/**
 * Created by alnedorezov on 5/26/17.
 */
function initBrightnessDecrease() {
    Tool.brightnessDecrease = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                minusBrightness();
                /*
                 if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {

                 }
                 */
            }
        });
    };
}