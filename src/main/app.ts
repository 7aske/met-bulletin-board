import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
import { ChildProcess, spawn } from "child_process";
import { resolve } from "path";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { initDatabase } from "./database/initDatabase";

export const INDEX = resolve(process.cwd(), "dist/renderer/views/index.html");
export const TEMPLATES_DIR = resolve(process.cwd(), "templates");
export const CONFIG_DIR = resolve(process.cwd(), "config/config.cfg");

if (dotenv.config({path: CONFIG_DIR}).error)
	throw "Invalid config";

export const TEMPLATE_TIMEOUT: number = (process.env.TEMPLATE_TIMEOUT ? parseInt(process.env.TEMPLATE_TIMEOUT) : 60) * 1000;

let temp_index = 0;
let db = null;
let server: ChildProcess = null;
let window: BrowserWindow = null;

export let templates: string[] = [];

const main = async () => {
	initDirs();
	db = await initDatabase();
	templates = readTemplates();
	server = startServer();
	window = new BrowserWindow({
		width: 1440,
		height: 900,
		darkTheme: true,
		title: "Metropolitan Bulletin Board",
	});
	// window.setMenu(null);
	window.loadFile(INDEX);
	// window.loadFile(templates[temp_index]);
	window.on("ready-to-show", window.show);

	changeSlide();
	const slideshowInterval = setInterval(changeSlide, TEMPLATE_TIMEOUT);
	const updateTempates = setInterval(() => templates = readTemplates(), TEMPLATE_TIMEOUT);
	// await addVote(db, "e4S1v_j_o", new Vote("choice1", "3365"));
	// await addPoll(db, new Poll(["choice 1", "choice 2"], new Date()));
};


const close = () => {
	if (server != null)
		server.kill("SIGKILL");
	app.exit(0);
	process.exit(0);
};

const startServer = () => {
	return spawn("node", ["dist/server/server.js"], {stdio: "inherit"});
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
	if (tmp_len > 0 ) {
		if (temp_index < tmp_len) {
			const currTemplate = templates[temp_index];
			const template = resolve(TEMPLATES_DIR, currTemplate);
			if (existsSync(template)) {
				const td: TemplateDataType = {template: readFileSync(template), index: temp_index, total: tmp_len};
				window.webContents.send("template-set", td);
				temp_index = ++temp_index == tmp_len ? 0 : temp_index;
			}
		} else {
			temp_index = 0;
			const currTemplate = templates[temp_index];
			const template = resolve(TEMPLATES_DIR, currTemplate);
			if (existsSync(template)) {
				const td: TemplateDataType = {template: readFileSync(template), index: temp_index, total: tmp_len};
				window.webContents.send("template-set", td);
				temp_index = ++temp_index == tmp_len ? 0 : temp_index;
			}
		}
	} else {
		window.webContents.send("template-set", {template: [], index: 0, total: 0});
	}
};

ipcMain.on("template-get", (event: any, data: any) => {
	if (data < templates.length) {
		if (existsSync(templates[data])) {
			const td: TemplateDataType = {
				template: readFileSync(templates[data]),
				index: data,
				total: templates.length,
			};
			temp_index = ++data == templates.length ? 0 : data;
			event.sender.send("template-set", td);
		}
	}
});
app.on("ready", main);
app.on("window-all-closed", close);
