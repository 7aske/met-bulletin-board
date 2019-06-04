"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_1 = require("fs");
const initDatabase_1 = require("./database/initDatabase");
exports.INDEX = path_1.resolve(process.cwd(), "dist/renderer/views/index.html");
exports.TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
exports.CONFIG_DIR = path_1.resolve(process.cwd(), "config/config.cfg");
if (dotenv_1.default.config({ path: exports.CONFIG_DIR }).error)
    throw "Invalid config";
exports.TEMPLATE_TIMEOUT = (process.env.TEMPLATE_TIMEOUT ? parseInt(process.env.TEMPLATE_TIMEOUT) : 60) * 1000;
exports.KEY_TIMEOUT = (process.env.KEY_TIMEOUT ? parseInt(process.env.KEY_TIMEOUT) : 3600) * 1000;
const hash = crypto_1.default.createHash("sha256");
let temp_index = 0;
let db = null;
let server = null;
let window = null;
exports.templates = [];
const main = () => __awaiter(this, void 0, void 0, function* () {
    const key = generateKey();
    initDirs();
    db = yield initDatabase_1.initDatabase();
    exports.templates = readTemplates();
    server = startServer(key);
    window = new electron_1.BrowserWindow({
        width: 1440,
        height: 900,
        title: "Metropolitan Bulletin Board",
    });
    window.loadFile(exports.INDEX);
    window.on("ready-to-show", window.show);
    setTimeout(() => window.webContents.send("key-set", key), 2000);
    const updateTempates = setInterval(() => exports.templates = readTemplates(), exports.TEMPLATE_TIMEOUT);
    const slideshowInterval = setInterval(changeSlide, exports.TEMPLATE_TIMEOUT);
});
const close = () => {
    if (server != null)
        server.kill("SIGKILL");
    electron_1.app.exit(0);
    process.exit(0);
};
const generateKey = () => {
    const randnum = Math.random();
    hash.update(randnum.toString());
    return hash.digest().toString("hex");
};
const startServer = (key) => {
    return child_process_1.spawn("node", ["dist/server/server.js"], { stdio: "inherit", env: { "KEY": key } });
};
const initDirs = () => {
    if (!fs_1.existsSync(exports.TEMPLATES_DIR)) {
        fs_1.mkdirSync(exports.TEMPLATES_DIR, { recursive: true });
    }
    if (!fs_1.existsSync(exports.TEMPLATES_DIR)) {
        fs_1.mkdirSync(exports.TEMPLATES_DIR, { recursive: true });
    }
};
const readTemplates = () => {
    return fs_1.readdirSync(exports.TEMPLATES_DIR)
        .filter(dir => dir.endsWith(".html"))
        .map(dir => path_1.resolve(exports.TEMPLATES_DIR, dir));
};
const changeSlide = () => {
    const tmp_len = exports.templates.length;
    if (tmp_len > 0) {
        if (temp_index < tmp_len) {
            const currTemplate = exports.templates[temp_index];
            const template = path_1.resolve(exports.TEMPLATES_DIR, currTemplate);
            if (fs_1.existsSync(template)) {
                const filename = path_1.basename(template);
                const td = {
                    template: fs_1.readFileSync(template),
                    index: temp_index,
                    total: tmp_len,
                    id: path_1.basename(filename, path_1.extname(filename)),
                };
                window.webContents.send("template-set", td);
                temp_index = ++temp_index == tmp_len ? 0 : temp_index;
            }
        }
        else {
            temp_index = 0;
            const currTemplate = exports.templates[temp_index];
            const template = path_1.resolve(exports.TEMPLATES_DIR, currTemplate);
            if (fs_1.existsSync(template)) {
                const td = {
                    template: fs_1.readFileSync(template),
                    index: temp_index,
                    total: tmp_len,
                    id: "",
                };
                window.webContents.send("template-set", td);
                temp_index = ++temp_index == tmp_len ? 0 : temp_index;
            }
        }
    }
    else {
        window.webContents.send("template-set", { template: [], index: 0, total: 0 });
    }
};
electron_1.ipcMain.on("template-get", (event, data) => {
    if (data < exports.templates.length) {
        const template = exports.templates[data];
        if (fs_1.existsSync(template)) {
            const filename = path_1.basename(template);
            const td = {
                template: fs_1.readFileSync(exports.templates[data]),
                index: data,
                total: exports.templates.length,
                id: path_1.basename(filename, path_1.extname(filename)),
            };
            temp_index = ++data == exports.templates.length ? 0 : data;
            event.sender.send("template-set", td);
        }
    }
});
electron_1.app.on("ready", main);
electron_1.app.on("window-all-closed", close);
