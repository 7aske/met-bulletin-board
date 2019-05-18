"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var indicatorContainer = document.querySelector("#indicator-container");
var frame = document.querySelector("iframe");
var section = document.querySelector("main section");
indicatorContainer.addEventListener("click", function (ev) {
    var event = ev;
    var element = document.elementFromPoint(event.x, event.y);
    if (element != null) {
        if (element.classList.contains("indicator")) {
            for (var i = 0; i < indicatorContainer.children.length; i++) {
                if (indicatorContainer.children[i] == element) {
                    electron_1.ipcRenderer.send("template-get", i);
                }
            }
        }
    }
});
electron_1.ipcRenderer.on("template-set", function (event, data) {
    section.innerHTML = data.template.toString();
    var len = indicatorContainer.children.length;
    if (len < data.total) {
        for (var i = 0; i < data.total - len; i++) {
            var div = document.createElement("DIV");
            div.classList.add("indicator");
            indicatorContainer.appendChild(div);
        }
    }
    else if (len > data.total) {
        indicatorContainer.lastElementChild.remove();
    }
    indicatorContainer.querySelectorAll(".indicator").forEach(function (e, i) {
        var element = e;
        if (i == data.index) {
            element.classList.add("active");
        }
        else {
            element.classList.remove("active");
        }
    });
});
