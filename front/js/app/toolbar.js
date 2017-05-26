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

function setIsButtonSelected(btn) {
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

function initNavMenu() {
    getElements();
    setElementsOnClick();
    initBrightness();
    setIsButtonSelected(btnPolygon);
    initSave();
    initHand();
    initPolygon();
    initBrightnessIncrease();
    initBrightnessDecrease();
    activeTool = Tool.polygon();
    activeTool.onClick(true);
}

function getElements() {
    btnSave = document.getElementsByClassName('btnsave')[0];
    btnHand = document.getElementsByClassName('btn-hand')[0];
    btnPolygon = document.getElementsByClassName('btn-polygon')[0];
    btnEdit = document.getElementsByClassName('btn-edit')[0];
    btnZoomIn = document.getElementsByClassName('btn-zoom-in')[0];
    btnZoomOut = document.getElementsByClassName('btn-zoom-out')[0];
    btnBrightnessHigh = document.getElementsByClassName('btn-brightness-high')[0];
    btnBrightnessLow = document.getElementsByClassName('btn-brightness-low')[0];
}

function clearOnClick(element) {
    element.onclick = '';
}

function btnEditFunc(btnIsSelected) {

}

function btnZoomInFunc(btnIsSelected) {

}

function btnZoomOutFunc(btnIsSelected) {

}

function setOnClick(btn) {
    btn.onclick = function () {
        let isButtonPressed = false;
        if (setIsButtonSelected(btn)) {
            isButtonPressed = true;
        }

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
            case 'btn_edit':
                btnEditFunc(isButtonPressed);
                break;
            case 'btn_zoom_in':
                btnZoomInFunc(isButtonPressed);
                break;
            case 'btn_zoom_out':
                btnZoomOutFunc(isButtonPressed);
                break;
            case 'btn_brightness_high':
                activeTool = Tool.brightnessIncrease();
                break;
            case 'btn_brightness_low':
                activeTool = Tool.brightnessDecrease();
                break;
        }

        activeTool.onClick(isButtonPressed);
    }
}
