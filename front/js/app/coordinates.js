function initCoordinates(svg) {
    /*global onSave*/
    /*eslint no-undef: "error"*/
    svgImg = svg;
}

function getX(event) {
    event = event || window.event;
    /*global svgImg*/
    /*eslint no-undef: "error"*/
    return event.pageX - svgImg.getBoundingClientRect().left;
}

function getY(event) {
    event = event || window.event;
    /*global svgImg*/
    /*eslint no-undef: "error"*/
    return event.pageY - svgImg.getBoundingClientRect().top;
}

function getPoint(event) {
    return {
        x: getX(event),
        y: getY(event),
    };
}