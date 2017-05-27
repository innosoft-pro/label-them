/**
 * Created by alnedorezov on 5/26/17.
 */
function initPolygon() {
    Tool.polygon = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    //if (isButtonPressed) {
                    //    svgImg.onclick = function () {
                    //        if (!isButtonSelected(btnPolygon)) return;
                    //        svgImgOnClick(event);
                    //    };
                    //} else {
                    //    /*global clearOnClick*/
                    //    /*eslint no-undef: "error"*/
                    //    clearOnClick(svgImg.onclick);
                    //}
                }
            }
        });
    };
}