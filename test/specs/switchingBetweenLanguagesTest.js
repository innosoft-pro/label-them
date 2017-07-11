/**
 * Created by alnedorezov on 7/9/17.
 */
let assert = require('assert');
let projectFolderName = "git";
describe("webdriver.io page", function () {
    it("should switch between languages (case 12)", function () {
        browser.url('http://localhost:63342/' + projectFolderName + '/front/main_local.html');
        if (browser.desiredCapabilities == "WINDOWS") {
          browser.windowHandleSize({width: 1920, height: 1080});
        }

        let error = 2;
        let points = [[100, 100], [100, 200], [200, 100]];
        let activeLanguageName;
        let activeLanguageNameEnglish = "english";
        let activeLanguageNameRussian = "russian";
        let markupImageWithToolsNotificationString;
        let notTheFullImageWillBeShownNotificationString;
        let messageSpaceInnerContents;
        let labelParametersBlockTitleGolden;
        let labelParametersBlockTitle;
        let historyBlockTitleGolden;
        let historyBlockTitle;
        let polygonWasAddedAndAssignedAnId;
        let checkedDOMElement;
        let checkedDOMElementInnerText;

        // Step 0: Polygon tool is selected by default

        // Step 1: Check that activeLanguage.getLanguageName() returns “english”
        activeLanguageName = browser.execute("return activeLanguage.getLanguageName();").value;
        assert.equal(activeLanguageName, activeLanguageNameEnglish);

        // Step 2: Check that #messagespace DOM element contains either a string returned by
        // language.english().markupImageWithToolsNotificationString, or a string returned by
        // language.english().notTheFullImageWillBeShownNotificationString
        markupImageWithToolsNotificationString =
            browser.execute("return language.english().markupImageWithToolsNotificationString;").value;
        notTheFullImageWillBeShownNotificationString =
            browser.execute("return language.english().notTheFullImageWillBeShownNotificationString;").value;
        messageSpaceInnerContents =
            browser.execute("return document.getElementById(\"message_space\").innerText;").value;
        assert.ok(messageSpaceInnerContents.includes(markupImageWithToolsNotificationString) ||
            messageSpaceInnerContents.includes(notTheFullImageWillBeShownNotificationString));

        // Step 3: Check that #label-parameters-block-title DOM element contains a string
        // returned by language.english().labelParameters
        labelParametersBlockTitleGolden =
            browser.execute("return language.english().labelParameters;").value;
        labelParametersBlockTitle =
            browser.execute("return document.getElementById(\"label-parameters-block-title\").innerHTML;").value;
        assert.ok(labelParametersBlockTitle.includes(labelParametersBlockTitleGolden));

        // Step 4: Check that #history-block-title DOM element contains a string
        // returned by language.english().history
        historyBlockTitleGolden =
            browser.execute("return language.english().history;").value;
        historyBlockTitle =
            browser.execute("return document.getElementById(\"history-block-title\").innerHTML;").value;
        assert.ok(historyBlockTitle.includes(historyBlockTitleGolden));

        // Step 5: Label {(100, 100), (100, 200), (200, 100)} polygon.
        // 5.1. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);
        // 5.2. left click on the 100, 200 pixel of the image
        browser.leftClick("#canvas-parent", points[1][0], points[1][1]);
        // 5.3. left click on the 200, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[2][0], points[2][1]);
        // 5.4. left click on the 100, 100 pixel of the image
        browser.leftClick("#canvas-parent", points[0][0], points[0][1]);

        // Step 6: Check that historyRow0 DOM element exists and contains a string
        // returned by language.english().polygonWasAddedAndAssignedAnId
        checkedDOMElement = browser.execute("return document.getElementById(\"historyRow0\");").value;
        assert.notEqual(checkedDOMElement, null);

        polygonWasAddedAndAssignedAnId =
            browser.execute("return language.english().polygonWasAddedAndAssignedAnId;").value;
        checkedDOMElementInnerText =
            browser.execute("return document.getElementById(\"historyRow0\").innerText;").value;
        assert.ok(checkedDOMElementInnerText.includes(polygonWasAddedAndAssignedAnId));

        // Step 7: Select "russian" option in #language-selection-select select
        browser.selectByVisibleText("#language-selection-select", activeLanguageNameRussian);

        // Step 8: Check that activeLanguage.getLanguageName() returns “russian”
        activeLanguageName = browser.execute("return activeLanguage.getLanguageName();").value;
        assert.equal(activeLanguageName, activeLanguageNameRussian);

        // Step 9: Check that #message_space DOM element contains either a string returned by
        // language.russian().markupImageWithToolsNotificationString, or a string returned by
        // language.russian().notTheFullImageWillBeShownNotificationString
        markupImageWithToolsNotificationString =
            browser.execute("return language.russian().markupImageWithToolsNotificationString;").value;
        notTheFullImageWillBeShownNotificationString =
            browser.execute("return language.russian().notTheFullImageWillBeShownNotificationString;").value;
        messageSpaceInnerContents =
            browser.execute("return document.getElementById(\"message_space\").innerText;").value;
        assert.ok(messageSpaceInnerContents.includes(markupImageWithToolsNotificationString) ||
            messageSpaceInnerContents.includes(notTheFullImageWillBeShownNotificationString));

        // Step 10: Check that #label-parameters-block-title DOM element contains
        // a string returned by language.russian().labelParameters
        labelParametersBlockTitleGolden =
            browser.execute("return language.russian().labelParameters;").value;
        labelParametersBlockTitle =
            browser.execute("return document.getElementById(\"label-parameters-block-title\").innerHTML;").value;
        assert.ok(labelParametersBlockTitle.includes(labelParametersBlockTitleGolden));

        // Step 11: Check that #history-block-title DOM element contains a string returned by
        // language.russian().history
        historyBlockTitleGolden =
            browser.execute("return language.russian().history;").value;
        historyBlockTitle =
            browser.execute("return document.getElementById(\"history-block-title\").innerHTML;").value;
        assert.ok(historyBlockTitle.includes(historyBlockTitleGolden));

        // Step 12: Check that historyRow0 DOM element exists and contains a string returned by
        // language.russian().polygonWasAddedAndAssignedAnId
        checkedDOMElement = browser.execute("return document.getElementById(\"historyRow0\");").value;
        assert.notEqual(checkedDOMElement, null);

        polygonWasAddedAndAssignedAnId =
            browser.execute("return language.russian().polygonWasAddedAndAssignedAnId;").value;
        checkedDOMElementInnerText =
            browser.execute("return document.getElementById(\"historyRow0\").innerText;").value;
        assert.ok(checkedDOMElementInnerText.includes(polygonWasAddedAndAssignedAnId));

        // Step 13: Select "english" option in #language-selection-select select
        browser.selectByVisibleText("#language-selection-select", activeLanguageNameEnglish);

        // Step 14: Check that activeLanguage.getLanguageName() returns “english”
        activeLanguageName = browser.execute("return activeLanguage.getLanguageName();").value;
        assert.equal(activeLanguageName, activeLanguageNameEnglish);

        // Step 15: Check that #messagespace DOM element contains either a string returned by
        // language.english().markupImageWithToolsNotificationString, or a string returned by
        // language.english().notTheFullImageWillBeShownNotificationString
        markupImageWithToolsNotificationString =
            browser.execute("return language.english().markupImageWithToolsNotificationString;").value;
        notTheFullImageWillBeShownNotificationString =
            browser.execute("return language.english().notTheFullImageWillBeShownNotificationString;").value;
        messageSpaceInnerContents =
            browser.execute("return document.getElementById(\"message_space\").innerText;").value;
        assert.ok(messageSpaceInnerContents.includes(markupImageWithToolsNotificationString) ||
            messageSpaceInnerContents.includes(notTheFullImageWillBeShownNotificationString));

        // Step 16: Check that #label-parameters-block-title DOM element contains a string
        // returned by language.english().labelParameters
        labelParametersBlockTitleGolden =
            browser.execute("return language.english().labelParameters;").value;
        labelParametersBlockTitle =
            browser.execute("return document.getElementById(\"label-parameters-block-title\").innerHTML;").value;
        assert.ok(labelParametersBlockTitle.includes(labelParametersBlockTitleGolden));

        // Step 17: Check that #history-block-title DOM element contains a string
        // returned by language.english().history
        historyBlockTitleGolden =
            browser.execute("return language.english().history;").value;
        historyBlockTitle =
            browser.execute("return document.getElementById(\"history-block-title\").innerHTML;").value;
        assert.ok(historyBlockTitle.includes(historyBlockTitleGolden));

        // Step 18: Check that historyRow0 DOM element exists and contains a string
        // returned by language.english().polygonWasAddedAndAssignedAnId
        checkedDOMElement = browser.execute("return document.getElementById(\"historyRow0\");").value;
        assert.notEqual(checkedDOMElement, null);

        polygonWasAddedAndAssignedAnId =
            browser.execute("return language.english().polygonWasAddedAndAssignedAnId;").value;
        checkedDOMElementInnerText =
            browser.execute("return document.getElementById(\"historyRow0\").innerText;").value;
        assert.ok(checkedDOMElementInnerText.includes(polygonWasAddedAndAssignedAnId));
    });
});
