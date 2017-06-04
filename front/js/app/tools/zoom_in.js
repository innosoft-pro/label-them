/**
 * Created by alnedorezov on 5/26/17.
 */
function initZoomIn() {
    Tool.zoomIn = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                zoomPlus();

            },
            isProlonged: false,
            buttonId: "btn_zoom_in"
        });
    };
}