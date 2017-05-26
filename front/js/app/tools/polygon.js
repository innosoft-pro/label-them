/**
 * Created by alnedorezov on 5/26/17.
 */
Tool.polygon = function() {
    fromPrototype(Tool, {
        onClick: function(isButtonPressed) {
            if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                if (isButtonPressed) {
                    svgImg.onclick = function () {
                        if (!isButtonSelected(btnPolygon)) return;
                        svgImgOnClick(event);
                    };
                } else {
                    clearOnClick(svgImg.onclick);
                }
            }
        }
    });
};