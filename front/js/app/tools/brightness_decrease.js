/**
 * Created by alnedorezov on 5/26/17.
 */
function initBrightnessDecrease() {
    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.brightnessDecrease = function () {
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                minusBrightness();
                /*
                 if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {

                 }
                 */
            },
            isProlonged: false,
            buttonId: "btn_brightness_low"
        });
    };
}