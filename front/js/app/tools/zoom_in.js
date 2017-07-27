/**
 * Created by Ayk Badalyan on 04.06.2017.
 */
function initZoomIn() {

    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.zoomIn = function () {

        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
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

                /*global zoomPlus*/
                /*eslint no-undef: "error"*/
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