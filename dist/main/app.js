"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var window = null;
electron_1.app.on("ready", function () {
    window = new electron_1.BrowserWindow({ width: 800, height: 600, resizable: false });
    window.on("ready-to-show", function () { return window.loadFile("dist/renderer/views/index.html"); });
});
electron_1.app.on("window-all-closed", function () {
    window = null;
    electron_1.app.exit(0);
});
