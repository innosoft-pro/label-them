var btnSave;
var btnHand;
var btnPolygon;
var btnEdit;
var btnZoomIn;
var btnZoomOut;
var btnBrightnessHigh;
var btnBrightnessLow;


function initNavMenu() {
    getElements();
    setElementsOnClick();
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
    btnSave = document.getElementById('btn_save');
    btnHand = document.getElementById('btn_hand');
    btnPolygon = document.getElementById('btn_polygon');
    btnEdit = document.getElementById('btn_edit');
    btnZoomIn = document.getElementById('btn_zoom_in');
    btnZoomOut = document.getElementById('btn_zoom_out');
    btnBrightnessHigh = document.getElementById('btn_brightness_high');
    btnBrightnessLow = document.getElementById('btn_brightness_low');
}

function clearOnClick(element) {
    element.onclick = '';
}

function btnSaveFunc(btnIsSelected) {
    OnSave();
}

function btnHandFunc(btnIsSelected) {
    alert("Implement hand tool");
}

function btnPolygonFunc(btnIsSelected) {
    if (btnIsSelected) {
        svgImg.onclick = function () {
            svgImgOnClick(event);
        };
    } else {
        clearOnClick(svgImg.onclick);
    }
}

function btnEditFunc(btnIsSelected) {

}

function btnZoomInFunc(btnIsSelected) {

}

function btnZoomOutFunc(btnIsSelected) {

}

function btnBrightnessHighFunc(btnIsSelected) {

}

function btnBrightnessLowFunc(btnIsSelected) {

}

function setOnClick(btn) {
    btn.onclick = function () {
        var btnIsSelected = false;
        if (isButtonSelected(btn)) {
            btnIsSelected = true;
        }

        switch (btn.id) {
            case 'btn_save':
                btnSaveFunc(btnIsSelected);
                break;
            case 'btn_hand':
                btnHandFunc(btnIsSelected);
                break;
            case 'btn_polygon':
                btnPolygonFunc(btnIsSelected);
                break;
            case 'btn_edit':
                btnEditFunc(btnIsSelected);
                break;
            case 'btn_zoom_in':
                btnZoomInFunc(btnIsSelected);
                break;
            case 'btn_zoom_out':
                btnZoomOutFunc(btnIsSelected);
                break;
            case 'btn_brightness_high':
                btnBrightnessHighFunc(btnIsSelected);
                break;
            case 'btn_brightness_low':
                btnBrightnessLowFunc(btnIsSelected);
                break;
        }
    }
}

function isButtonSelected(btn) {
    if (btn.style.background === 'rgb(27, 109, 133)') {
        btn.style.background = '#ffffff';
        return false;
    } else {
        btn.style.background = '#1b6d85';
        return true;
    }
}