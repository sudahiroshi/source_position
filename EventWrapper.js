/*
 *
 * EventWrapper.js
 *
 * This utility class defines event type for mouse (as static property)
 *
 * Copyright 2013@Tomohiro IKEDA
 *
 */



function EventWrapper() {
}

(function() {
    var click = '';
    var start = '';
    var move  = '';
    var end   = '';

    // Touch Panel ?
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
        click = 'click';
        start = 'touchstart';
        move  = 'touchmove';
        end   = 'touchend';
    } else {
        click = 'click';
        start = 'mousedown';
        move  = 'mousemove';
        end   = 'mouseup';
    }

    EventWrapper.CLICK = click;
    EventWrapper.START = start;
    EventWrapper.MOVE  = move;
    EventWrapper.END   = end;
})();
