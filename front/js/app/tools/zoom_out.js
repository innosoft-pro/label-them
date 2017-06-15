/**
 * Created by alnedorezov on 5/26/17.
 */
function initZoomOut() {
    Tool.zoomOut = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                if (zoomCount === 0) return;
                zoomCount--;
                zoomMinus();
                svgScale(0.5);
            },
            isProlonged: false,
            buttonId: "btn_zoom_out"
        });
    };
}