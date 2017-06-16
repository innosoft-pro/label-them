/**
 * Created by alnedorezov on 5/26/17.
 */
function initZoomOut() {
    Tool.zoomOut = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {

                /*global zoomCount*/
                /*eslint no-undef: "error"*/
                if (zoomCount >= 0) {
                    return;
                }
                /*global zoomCount*/
                /*eslint no-undef: "error"*/
                zoomCount--;
                zoomMinus();

                /*global svgScale*/
                /*eslint no-undef: "error"*/
                svgScale(0.5);
            },
            isProlonged: false,
            buttonId: "btn_zoom_out"
        });
    };
}