/**
 * Created by Ayk Badalyan on 04.06.2017.
 */
function initZoomOut() {

    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.zoomOut = function () {

        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {

                /*global zoomCount*/
                /*eslint no-undef: "error"*/
                if (zoomCount <= 0) {
                    return;
                }
                /*global zoomCount, zoomMinus*/
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