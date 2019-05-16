"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var lowdb_1 = __importDefault(require("lowdb"));
var FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
var path_1 = require("path");
var INDEX = path_1.resolve(process.cwd(), "dist/renderer/views/index.html");
var DB_PATH = path_1.resolve(process.cwd(), "database/db.json");
var adapter = new FileSync_1.default(DB_PATH);
var db = lowdb_1.default(adapter);
db.defaults({ polls: [] });
db.write();
// @ts-ignore
db.get("polls").push({});
db.write();
var window = null;
var server = null;
function main() {
    startServer();
    window = new electron_1.BrowserWindow({
        width: 1440,
        height: 900,
        // fullscreen: true,
        darkTheme: true,
    });
    window.loadFile(INDEX);
    window.on("ready-to-show", window.show);
}
function close() {
    server.kill("SIGKILL");
    electron_1.app.exit(0);
}
function startServer() {
    try {
        server = child_process_1.spawn("node", ["dist/server/server.js"], { stdio: "inherit" });
    }
    catch (e) {
        throw e;
    }
}
electron_1.app.on("ready", main);
electron_1.app.on("window-all-closed", close);
