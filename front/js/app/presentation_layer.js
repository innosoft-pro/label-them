/**
 * Created by alnedorezov on 5/31/17.
 */
// loading remote image
let img = new Image();

function initPresentationLayer() {
    img.src = document.getElementById("img_url").innerText;
    img.onload = function () {
        resize();
        initZoom();
        window.addEventListener("resize", resize, false);
    };

    initSvg();
}

/*
 * handles resizing of the canvas and of the svg layer for 1 to 1 mapping between image height and canvas & svg height
 * sends a notification to the user if not the full image will be shown
 **/
function resize() {
    /*global resizeCanvas*/
    /*eslint no-undef: "error"*/
    let notificationString = resizeCanvas(img);
    /*global resizeSvg*/
    /*eslint no-undef: "error"*/
    resizeSvg(img);

    if (notificationString === "Not the full image will be shown") { // Notify the user that not the full image will be shown
        showMessage(
            "Image cannot fit the screen in width. " +
            "Please, uncover the whole image displayed below with the use of horizontal scrolling " +
            "and markup it using the tools from the block on the left.",
            MessageTypeEnum.WARNING);
    } else { // Display the instructions for the user
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }
}