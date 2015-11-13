"use strict";

function setDebugView(_show) {
    var el = document.getElementById("debug-view");
    el.style.display = _show ? "block" : "none";

    localStorage.setItem("showDebugView", _show ? "on" : "off")
}

function getDebugViewState() {
    var show = localStorage.getItem("showDebugView");
    return (show === "on");     // Includes null for when there is no entry in local storage.
}

function toggleDebugView() {
    setDebugView(!getDebugViewState());
}

setDebugView(getDebugViewState());
