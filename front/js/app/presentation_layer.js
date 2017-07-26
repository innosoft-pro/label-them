/**
 * Created by alnedorezov on 5/31/17.
 */
// loading remote image
let img = new Image();
let latestNotificationFromCanvas = null;
let minimapImage = new Image();

function initPresentationLayer(acceptMode) {
    img.src = document.getElementById("img_url").innerText;
    img.onload = function () {
        resize();
        /*global initZoom*/
        /*eslint no-undef: "error"*/
        initZoom();
        window.addEventListener("resize", resize, false);
    };

    minimapImage = $("#minimap_img")[0];
    minimapImage.src = img.src;
    minimapImage.onload = function () {
        //Draw rectangle on the minimap on initialization
        /*global onScroll*/
        /*eslint no-undef: "error"*/
        onScroll();
        /*global redrawMinimapOnResize*/
        /*eslint no-undef: "error"*/
        redrawMinimapOnResize();
    };


    initSvg();
    changeScrollingPositionInTheHistoryBlock();
    scrollHistoryTableBodyToBottom();

    if (acceptMode) {
        let polygonsArray = JSON.parse(window.thisTask.getSolution().output_values.result);

        for (let polygonObjectId in polygonsArray) {
            let polygonObject = polygonsArray[polygonObjectId];
            let polygon = addPolygonFromObject(polygonObject);

            let de = new DataEntity(polygon.polygonId);
            de.parameters = polygonObject["parameters"];
            polygons[polygon.polygonId] = polygon;
            dc.addEntity(de, polygon.polygonId);
        }
    }


    // if (acceptMode) {
    //     hideToolbar();
    //     hideHistory();
    // }
}

/*
 * handles resizing of the canvas and of the svg layer for 1 to 1 mapping between image height and canvas & svg height
 * sends a notification to the user if not the full image will be shown
 **/
function resize() {
    /*global resizeCanvas*/
    /*eslint no-undef: "error"*/
    latestNotificationFromCanvas = resizeCanvas(img);
    /*global resizeSvg*/
    /*eslint no-undef: "error"*/
    resizeSvg(img);
    changeScrollingPositionInTheHistoryBlock();
    scrollHistoryTableBodyToBottom();
    showMessageToTheUserDependingOnTheLatestNotificationFromCanvas();
    /*global redrawMinimapOnResize*/
    /*eslint no-undef: "error"*/
    redrawMinimapOnResize();
}

function hideToolbar() {
    let toolbar = document.getElementsByClassName("btn-group-vertical")[0];
    toolbar.style.display = 'none';
}

function hideHistory() {
    let history = document.getElementById("history-panel");
    history.style.display = 'none';
}

function changeScrollingPositionInTheHistoryBlock() {
    let historyTable = document.getElementsByClassName("history-table")[0];
    let historyTableBody = document.getElementsByClassName("history-table-body")[0];
    let width = historyTable.clientWidth;
    historyTableBody.style.width = width + "px";
}

function scrollHistoryTableBodyToBottom() {
    let historyTableBody = document.getElementsByClassName("history-table-body")[0];
    historyTableBody.scrollTop = historyTableBody.scrollHeight;
}

function showMessageToTheUserDependingOnTheLatestNotificationFromCanvas() {
    if (latestNotificationFromCanvas === "Not the full image will be shown") { // Notify the user that not the full image will be shown
        showMessage(activeLanguage.notTheFullImageWillBeShownNotificationString, MessageTypeEnum.WARNING);
    } else { // Display the instructions for the user
        showMessage(
            activeLanguage.markupImageWithToolsNotificationString, MessageTypeEnum.INFO);
    }
}
