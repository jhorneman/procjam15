'use strict';

function showDebugView() {
    var el = document.getElementById("debug-view");
    el.style.display = "block";

    el = document.getElementById("hidden-debug-view");
    el.style.display = "none";
}

function hideDebugView() {
    var el = document.getElementById("debug-view");
    el.style.display = "none";

    el = document.getElementById("hidden-debug-view");
    el.style.display = "block";
}
