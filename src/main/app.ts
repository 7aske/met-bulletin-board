import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
import crypto from "crypto";
import { ChildProcess, spawn } from "child_process";
import { basename, extname, resolve } from "path";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { initDatabase } from "./database/initDatabase";

export const INDEX = resolve(process.cwd(), "dist/renderer/views/index.html");
export const TEMPLATES_DIR = resolve(process.cwd(), "templates");
export const CONFIG_DIR = resolve(process.cwd(), "config/config.cfg");

if (dotenv.config({path: CONFIG_DIR}).error)
	throw "Invalid config";
export const TEMPLATE_TIMEOUT: number = (process.env.TEMPLATE_TIMEOUT ? parseInt(process.env.TEMPLATE_TIMEOUT) : 60) * 1000;
export const WATCHER_TIMEOUT: number = (process.env.WATCHER_TIMEOUT ? parseInt(process.env.WATCHER_TIMEOUT) : 10) * 1000;
export const KEY_TIMEOUT: number = (process.env.KEY_TIMEOUT ? parseInt(process.env.KEY_TIMEOUT) : 3600) * 1000;

let temp_index = 0;
let db = null;
let server: ChildProcess = null;
let window: BrowserWindow = null;

export let templates: string[] = [];

const main = async () => {
	const key = generateKey();
	initDirs();
	db = await initDatabase();
	templates = readTemplates();
	server = startServer(key);
	window = new BrowserWindow({
		width: 1440,
		height: 900,
		title: "Metropolitan Bulletin Board",
	});

	window.loadFile(INDEX);
	window.on("ready-to-show", window.show);
	window.webContents.on("dom-ready", () => window.webContents.send("key-set", key));
	const updateTempates = setInterval(() => templates = readTemplates(), WATCHER_TIMEOUT);
	const slideshowInterval = setInterval(changeSlide, TEMPLATE_TIMEOUT);
};

const close = () => {
	if (server != null)
		server.kill("SIGKILL");
	app.exit(0);
	process.exit(0);
};

const generateKey = (): string => {
	const hash = crypto.createHash("sha256");
	const randnum = Math.random();
	hash.update(randnum.toString());
	return hash.digest().toString("hex");
};

const startServer = (key: string) => {
	return spawn("node", ["dist/server/server.js"], {stdio: "inherit", env: {"KEY": key}});
};

const initDirs = () => {
	if (!existsSync(TEMPLATES_DIR)) {
		mkdirSync(TEMPLATES_DIR, {recursive: true});
	}

	if (!existsSync(TEMPLATES_DIR)) {
		mkdirSync(TEMPLATES_DIR, {recursive: true});
	}
};

const readTemplates = () => {
	return readdirSync(TEMPLATES_DIR)
		.filter(dir => dir.endsWith(".html"))
		.map(dir => resolve(TEMPLATES_DIR, dir));
};

const changeSlide = () => {
	const tmp_len = templates.length;
	if (tmp_len > 0) {
		if (temp_index < tmp_len) {
			const currTemplate = templates[temp_index];
			const template = resolve(TEMPLATES_DIR, currTemplate);
			if (existsSync(template)) {
				const filename = basename(template);
				const td: TemplateDataType = {
					template: readFileSync(template),
					index: temp_index,
					total: tmp_len,
					id: basename(filename, extname(filename)),
				};
				window.webContents.send("template-set", td);
				temp_index = ++temp_index == tmp_len ? 0 : temp_index;
			}
		} else {
			temp_index = 0;
			const currTemplate = templates[temp_index];
			const template = resolve(TEMPLATES_DIR, currTemplate);
			if (existsSync(template)) {
				const td: TemplateDataType = {
					template: readFileSync(template),
					index: temp_index,
					total: tmp_len,
					id: "",
				};
				window.webContents.send("template-set", td);
				temp_index = ++temp_index == tmp_len ? 0 : temp_index;
			}
		}
	} else {
		window.webContents.send("template-reset");
	}
};
ipcMain.on("template-get", (event: any, data: any) => {
	if (data < templates.length) {
		const template = templates[data];
		if (existsSync(template)) {
			const filename = basename(template);
			const td: TemplateDataType = {
				template: readFileSync(templates[data]),
				index: data,
				total: templates.length,
				id: basename(filename, extname(filename)),
			};
			temp_index = ++data == templates.length ? 0 : data;
			event.sender.send("template-set", td);
		}
	}
});

app.on("ready", main);
app.on("window-all-closed", close);
