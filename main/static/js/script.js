"use strict";

function showDebugView() {
    var el = document.getElementById("debug-view");
    el.style.display = "block";

    el = document.getElementById("hidden-debug-view");
    el.style.display = "none";

    localStorage.setItem("showDebugView", "on")
}

function hideDebugView() {
    var el = document.getElementById("debug-view");
    el.style.display = "none";

    el = document.getElementById("hidden-debug-view");
    el.style.display = "block";

    localStorage.setItem("showDebugView", "off")
}

var showFlag = localStorage.getItem("showDebugView");
if (showFlag === null) { showFlag = false; }
if (showFlag === "on") {
    showDebugView();
} else {
    hideDebugView();
}
