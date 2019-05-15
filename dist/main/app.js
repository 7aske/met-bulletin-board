"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var INDEX = process.cwd() + "/dist/renderer/views/index.html";
var window = null;
function main() {
    window = new electron_1.BrowserWindow({
        width: 1440,
        height: 900,
        // fullscreen: true,
        darkTheme: true,
    });
    window.loadFile(INDEX);
    window.on("ready-to-show", window.show);
}
electron_1.app.on("ready", main);
electron_1.app.on("window-all-closed", function () { return electron_1.app.exit(0); });
