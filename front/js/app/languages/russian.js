/**
 * Created by alnedorezov on 6/29/17.
 */
function initRussianLanguageSupport() {
    /*global language*/
    /*eslint no-undef: "error"*/
    language.russian = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(language, {
            getLanguageName() {
                return "russian";
            },
            polygonSpaceSign: "Многоугольник ",
            spaceSignWasAssignedAnId: " создан. Ему присвоен номер ",
            spaceSignOpenBracketWithIdSpaceSign: " (под номером ",
            closeBracketSpaceSignWasDeleted: ") был удалён",
            classOfPolygonIdWasChangedToNewClassValue(polygonId, newClassValue) {
                return "Класс многоугольника " + polygonId + " был изменён на " + newClassValue;
            },
            parameterParameterNameOfPolygonPolygonIdWasChangedToNewParameterValue(parameterName, polygonId,
                                                                                  newParameterValue) {
                return "Параметр " + parameterName + " многоугольника " + polygonId +
                    " был изменён на " + newParameterValue;
            },
            objectCreateImplementationOnlyAcceptsTheFirstParameter: "Реализация метода Object.create принимает" +
            " только первый параметр.",
            notTheFullImageWillBeShownNotificationString: "Ширина изображения превышает размер выделенного " +
            "под него блока. Пожалуйста, используйте горизонтальную прокрутку для просмотра всего изображения " +
            "и разметьте его при помощи инструментов расположенных в блоке слева.",
            markupImageWithToolsNotificationString: "Пожалуйста, разметьте отображённое ниже изображение при помощи " +
            "инструментов расположенных в блоке слева.",
            characterizeObjectInTheRightMenu: "Пожалуйста, охарактеризуйте выбранный объект в правом верхнем блоке.",
            labelParameters: "Параметры объекта",
            history: "История"
        });
    };
}
