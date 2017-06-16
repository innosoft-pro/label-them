/**
 * Created by alnedorezov on 5/26/17.
 */
function initZoomIn() {
    Tool.zoomIn = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {

                /*global zoomCount*/
                /*eslint no-undef: "error"*/
                /*global maxZoomCount*/
                /*eslint no-undef: "error"*/
                if (zoomCount >= maxZoomCount) {
                    return;
                }
                /*global zoomCount*/
                /*eslint no-undef: "error"*/
                zoomCount++;
                zoomPlus();

                /*global svgScale*/
                /*eslint no-undef: "error"*/
                svgScale(2);
            },
            isProlonged: false,
            buttonId: "btn_zoom_in"
        });
    };
}