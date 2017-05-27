/**
 * Created by alnedorezov on 5/26/17.
 */
function initSave() {
    Tool.save = function () {
        return fromPrototype(Tool, {
            onClick: function (isButtonPressed) {
                /*global onSave*/
                /*eslint no-undef: "error"*/
                onSave();
                /*
                 if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {

                 }
                 */
            },
            isProlonged: false,
            buttonId: "btn_save"
        });
    };
}