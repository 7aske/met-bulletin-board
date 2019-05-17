"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var frame = document.querySelector("iframe");
electron_1.ipcRenderer.on("change-template", function (event, data) {
    console.log(data);
    frame.src = data;
});
