var btnSave;
var btnHand;
var btnPolygon;
var btnEdit;
var btnZoomIn;
var btnZoomOut;
var btnBrightnessHigh;
var btnBrightnessLow;

var polygonSelected = true;

function setIsButtonSelected(btn, isEnabled) {
    if (isEnabled) {
        btn.style.background = '#ffffff';
    } else {
        btn.style.background = '#1b6d85';
    }
}

function initNavMenu() {
    getElements();
    setElementsOnClick();
    initBrightness();
    setIsButtonSelected(btnPolygon, isButtonSelected(btnPolygon));
    btnPolygonFunc(true);
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
    btnSave = document.getElementsByClassName('btnsave')[0];
    btnHand = document.getElementsByClassName('btn-hand')[0];
    btnPolygon = document.getElementsByClassName('btn-polygon')[0];
    btnEdit = document.getElementsByClassName('btn-edit')[0];
    btnZoomIn = document.getElementsByClassName('btn-zoom-in')[0];
    btnZoomOut = document.getElementsByClassName('btn-zoom-out')[0];
    btnBrightnessHigh = document.getElementsByClassName('btn-brightness-high')[0];
    btnBrightnessLow = document.getElementsByClassName('btn-brightness-low')[0];

    svgImg.addEventListener('click', onSVGClick, true);
}

function onSVGClick() {
    if (polygonSelected) {
        svgImgOnClick(event);
    } else {
        svgImgOnClickSelect(event);
    }
}

function clearOnClick(element) {
    element.onclick = '';
}

function btnSaveFunc(btnIsSelected) {
    /*global onSave*/
    /*eslint no-undef: "error"*/
    onSave();
}

function btnHandFunc(btnIsSelected) {

  polygonSelected = false;

  // svgImg.onclick = function () {
  //     console.log('hand func');
  //     svgImgOnClickSelect(event);
  // };


  // if (btnIsSelected) {
  //     console.log('hand func');
  //
  // } else {
  //     clearOnClick(svgImg.onclick);
  // }
}

function btnPolygonFunc(btnIsSelected) {

    polygonSelected = true;

    // svgImg.onclick = function () {
    //     if (!isButtonSelected(btnPolygon)) return;
    //     svgImgOnClick(event);
    // };



    // if (btnIsSelected) {
    //
    // } else {
    //     clearOnClick(svgImg.onclick);
    // }
}

function btnEditFunc(btnIsSelected) {

}

function btnZoomInFunc(btnIsSelected) {

}

function btnZoomOutFunc(btnIsSelected) {

}

function btnBrightnessHighFunc(btnIsSelected) {
    plusBrightness();
}

function btnBrightnessLowFunc(btnIsSelected) {
    minusBrightness();
}

function setOnClick(btn) {
    btn.onclick = function () {
        var btnIsSelected = false;
        if (setIsButtonSelected(btn, isButtonSelected(btn))) {
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
        return true;
    } else {
        return false;
    }
}
