/**
 * Created by alnedorezov on 5/26/17.
 */
function initBrightnessIncrease() {
    Tool.brightnessIncrease = function () {
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                plusBrightness();
                /*
                 if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {

                 }
                 */
            },
            isProlonged: false,
            buttonId: "btn_brightness_high"
        });
    };
}