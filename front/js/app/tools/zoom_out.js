/**
 * Created by alnedorezov on 5/26/17.
 */
function initZoomOut() {
    Tool.zoomOut = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                zoomMinus();

            },
            isProlonged: false,
            buttonId: "btn_zoom_out"
        });
    };
}