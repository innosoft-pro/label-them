/**
 * Created by alnedorezov on 5/31/17.
 */
// loading remote image
let img = new Image();

function initPresentationLayer() {
    img.onload = function () {
        resize();
        window.addEventListener("resize", resize, false);
    };

    img.src = document.getElementById("img_url").innerText;

    initSvg();
}

/*
 * handles resizing of the canvas and of the svg layer for 1 to 1 mapping between image height and canvas & svg height
 * sends a notification to the user if not the full image will be shown
 **/
function resize() {
    let notificationString = resizeCanvas(img);
    resizeSvg(img);

    if (notificationString === "Not the full image will be shown") { // Notify the user that not the full image will be shown
        showMessage(
            "Image cannot fit the screen in width. " +
            "Only left part of the image that fits the screen is displayed! " +
            "Please, markup the visible part of the image displayed below using the " +
            "tools from the block on the left or skip this image.",
            MessageTypeEnum.DANGER);
    } else { // Display the instructions for the user
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }
}