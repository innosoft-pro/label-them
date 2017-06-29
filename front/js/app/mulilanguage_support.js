/**
 * Created by alnedorezov on 6/29/17.
 */
let language = {
    getLanguageName() {
    },
    get2LetterLanguageCode() {
        let languageName = getLanguageName();
        if (!(typeof languageName === "string" || languageName instanceof String)) {
            return "??";
        } else {
            return languageName.substr(0, 2);
        }
    }
};

let activeLanguage;

function initMultiLanguageSupport() {
    initEnglishLanguageSupport();
    initRussianLanguageSupport();
    // English language is enabled by default
    selectLanguage(language.english());
    displayLanguageSelection([language.english(), language.russian()]);
}

function selectLanguage(selectedLanguage) {
    activeLanguage = selectedLanguage;
    translateBlocksTitles();
    recreateHistoryBlockContents();
    showMessageToTheUserDependingOnTheLatestNotificationFromCanvas();
}