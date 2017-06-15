/**
 * Created by alnedorezov on 5/26/17.
 */
function initBrightnessIncrease() {
    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.brightnessIncrease = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                // plusBrightness();
                svgScale(2);
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
