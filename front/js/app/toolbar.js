let btnSave;
let btnHand;
let btnPolygon;
let btnEdit;
let btnZoomIn;
let btnZoomOut;
let btnBrightnessHigh;
let btnBrightnessLow;
let buttons = [];
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
    for(let i=0; i<buttons.size; i++) {
        setOnClick(buttons[i]);
    }
}

function getElements() {
    buttons.push(document.getElementsByClassName('btnsave')[0]);
    buttons.push(document.getElementsByClassName('btn-hand')[0]);
    buttons.push(document.getElementsByClassName('btn-polygon')[0]);
    buttons.push(document.getElementsByClassName('btn-edit')[0]);
    buttons.push(document.getElementsByClassName('btn-zoom-in')[0]);
    buttons.push(document.getElementsByClassName('btn-zoom-out')[0]);
    buttons.push(document.getElementsByClassName('btn-brightness-high')[0]);
    buttons.push(document.getElementsByClassName('btn-brightness-low')[0]);

    svgImg.addEventListener('click', onSVGClick, true);
}

function initNavMenu() {
    getElements();
    setElementsOnClick();
    initBrightness();
    setIsButtonSelected(buttons[2]); // polygon tool is selected by default
    initSave();
    initHand();
    initPolygon();
    initBrightnessIncrease();
    initBrightnessDecrease();
    activeTool = Tool.polygon();
    activeTool.onClick(true);
}

function onSVGClick() {
    if (activeTool.toString()===Tool.polygon().toString()) {
        svgImgOnClick(event);
    } else if (activeTool.toString()===Tool.hand().toString()) {
        svgImgOnClickSelect(event);
    }
}

function clearOnClick(element) {
    element.onclick = '';
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
