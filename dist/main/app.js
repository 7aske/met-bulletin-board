"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var initDatabase_1 = require("./database/initDatabase");
exports.INDEX = path_1.resolve(process.cwd(), "dist/renderer/views/index.html");
exports.TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
var server = null;
var db = null;
var temp_index = 0;
var window = null;
exports.templates = fs_1.readdirSync(exports.TEMPLATES_DIR)
    .filter(function (dir) { return dir.endsWith(".html"); })
    .map(function (dir) { return path_1.resolve(exports.TEMPLATES_DIR, dir); });
function close() {
    if (server != null)
        server.kill("SIGKILL");
    electron_1.app.exit(0);
    process.exit(0);
}
function startServer() {
    return child_process_1.spawn("node", ["dist/server/server.js"], { stdio: "inherit" });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var slideshowInterval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDatabase_1.initDatabase()];
                case 1:
                    db = _a.sent();
                    // await addVote(db, "e4S1v_j_o", new Vote("choice1", "3365"));
                    // await addPoll(db, new Poll(["choice 1", "choice 2"], new Date()));
                    server = startServer();
                    window = new electron_1.BrowserWindow({
                        width: 1440,
                        height: 900,
                        darkTheme: true,
                        title: "Metropolitan Bulletin Board"
                    });
                    // window.setMenu(null);
                    window.loadFile(exports.INDEX);
                    slideshowInterval = setInterval(changeSlide, 2000);
                    window.on("ready-to-show", window.show);
                    return [2 /*return*/];
            }
        });
    });
}
function changeSlide() {
    var template = path_1.resolve(exports.TEMPLATES_DIR, exports.templates[temp_index]);
    window.webContents.send("change-template", template);
    temp_index++;
    temp_index = temp_index == exports.templates.length ? 0 : temp_index;
}
// function changeSlide() {
// 	window.loadFile(resolve(TEMPLATES_DIR, templates[temp_index]));
// 	temp_index++;
// 	temp_index = temp_index == templates.length ? 0 : temp_index;
// }
electron_1.app.on("ready", main);
electron_1.app.on("window-all-closed", close);
