let btnSave;
let btnHand;
let btnPolygon;
let btnEdit;
let btnZoomIn;
let btnZoomOut;
let btnBrightnessHigh;
let btnBrightnessLow;
let activeTool;

function isButtonSelected(btn) {
    return btn.style.background === 'rgb(27, 109, 133)';
}

function changeButtonsSelectionState(btn) {
    let isEnabled = isButtonSelected(btn);
    if (isEnabled) {
        btn.style.background = '#ffffff';
    } else {
        btn.style.background = '#1b6d85';
    }
}

function setElementsOnClick() {
    setOnClick(btnSave);
    setOnClick(btnHand);
    setOnClick(btnPolygon);
    setOnClick(btnEdit);
    setOnClick(btnZoomIn);
    setOnClick(btnZoomOut);
    setOnClick(btnBrightnessHigh);
    setOnClick(btnBrightnessLow);
}

function getElements() {
    btnSave = document.getElementsByClassName('btn-save')[0];
    btnHand = document.getElementsByClassName('btn-hand')[0];
    btnPolygon = document.getElementsByClassName('btn-polygon')[0];
    btnEdit = document.getElementsByClassName('btn-edit')[0];
    btnZoomIn = document.getElementsByClassName('btn-zoom-in')[0];
    btnZoomOut = document.getElementsByClassName('btn-zoom-out')[0];
    btnBrightnessHigh = document.getElementsByClassName('btn-brightness-high')[0];
    btnBrightnessLow = document.getElementsByClassName('btn-brightness-low')[0];
}

function initNavMenu() {
    getElements();
    setElementsOnClick();
    initBrightness();
    changeButtonsSelectionState(btnPolygon); // polygon tool is selected by default
    initSave();
    initHand();
    initPolygon();
    initBrightnessIncrease();
    initBrightnessDecrease();
    activeTool = Tool.polygon();
    activeTool.onClick(true);
}

function setOnClick(btn) {
    btn.onclick = function () {
        changeButtonsSelectionState(btn);
        let isButtonPressed = isButtonSelected(btn);
        let previouslyActivatedTool = activeTool;

        switch (btn.id) {
            case 'btn_save':
                activeTool = Tool.save();
                break;
            case 'btn_hand':
                activeTool = Tool.hand();
                break;
            case 'btn_polygon':
                activeTool = Tool.polygon();
                break;
            case 'btn_brightness_high':
                activeTool = Tool.brightnessIncrease();
                break;
            case 'btn_brightness_low':
                activeTool = Tool.brightnessDecrease();
                break;
        }

        if (!activeTool.isProlonged) {
            activeTool.onClick(isButtonPressed);
            activeTool = previouslyActivatedTool;
            changeButtonsSelectionState(btn);
        } else {
            // If another tool is selected, emulate disabling of previously activated tool
            if (previouslyActivatedTool !== null && previouslyActivatedTool.buttonId !== activeTool.buttonId) {
                previouslyActivatedTool.onClick(false);
                let buttonOfPreviouslyActivatedTool = document.getElementById(previouslyActivatedTool.buttonId);
                changeButtonsSelectionState(buttonOfPreviouslyActivatedTool);
            }

            activeTool.onClick(isButtonPressed);

            if (isButtonPressed === false) {
                activeTool = null;
            }
        }
    }
}
