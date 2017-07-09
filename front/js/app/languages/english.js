/**
 * Created by alnedorezov on 6/29/17.
 */
function initEnglishLanguageSupport() {
    /*global language*/
    /*eslint no-undef: "error"*/
    language.english = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(language, {
            getLanguageName() {
                return "english";
            },
            polygonWasAddedAndAssignedAnId: "Polygon was added and assigned an id ",
            polygonWithIdSpaceSign: "Polygon with id ",
            closeBracketSpaceSignWasDeleted: " was deleted",
            classOfPolygonIdWasChangedToNewClassValue(polygonId, newClassValue) {
                return "Class of polygon " + polygonId + " was changed to " + newClassValue;
            },
            parameterParameterNameOfPolygonPolygonIdWasChangedToNewParameterValue(parameterName, polygonId,
                                                                                  newParameterValue) {
                return "Parameter " + parameterName + " of polygon " + polygonId +
                    " was changed to " + newParameterValue;
            },
            objectCreateImplementationOnlyAcceptsTheFirstParameter: "Object.create implementation only accepts " +
            "the first parameter.",
            notTheFullImageWillBeShownNotificationString: "Image cannot fit the screen in width. " +
            "Please, uncover the whole image displayed below with the use of horizontal scrolling " +
            "and markup it using the tools from the block on the left.",
            markupImageWithToolsNotificationString: "Please, markup the image displayed below using the tools " +
            "from the block on the left.",
            characterizeObjectInTheRightMenu: "Please, characterize the selected object in the right menu.",
            labelParameters: "Label Parameters",
            history: "History"
        });
    };
}
