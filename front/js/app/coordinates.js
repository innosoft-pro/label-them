/**
 * Initializes SVG global variable.
 * @param svg -Svg object from DOM
 * */
function initCoordinates(svg) {
    /*global onSave*/
    /*eslint no-undef: "error"*/
    svgImg = svg;
}

/**
 * Method returns mouse position x coordinate.
 * @param {Event} event - Mouse click event
 * @return {int} x coordinate
 * */
function getX(event) {
    event = event || window.event;
    /*global svgImg*/
    /*eslint no-undef: "error"*/
    return event.pageX - svgImg.getBoundingClientRect().left;
}


/**
 * Method returns mouse position y coordinate.
 * @param {Event} event - Mouse click event
 * @return {int} y coordinate
 * */
function getY(event) {
    event = event || window.event;
    /*global svgImg*/
    /*eslint no-undef: "error"*/
    return event.pageY - svgImg.getBoundingClientRect().top;
}

/**
 * Method returns mouse position Point.
 * @param {Event} event - Mouse click event
 * @return {Object} Point object
 * */
function getPoint(event) {
    return {
        x: getX(event),
        y: getY(event),
    };
}