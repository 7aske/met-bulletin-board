import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
import { ChildProcess, spawn } from "child_process";
import { resolve } from "path";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { initDatabase } from "./database/initDatabase";

export const INDEX = resolve(process.cwd(), "dist/renderer/views/index.html");
export const TEMPLATES_DIR = resolve(process.cwd(), "templates");
export const CONFIG_DIR = resolve(process.cwd(), "config/config.cfg");

let temp_index = 0;
let db = null;
let server: ChildProcess = null;
let window: BrowserWindow = null;

export let templates: string[] = [];

const main = async () => {
	initConfig();
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
	const slideshowInterval = setInterval(changeSlide, 2000);
	const updateTempates = setInterval(() => templates = readTemplates(), 2000);
	window.on("ready-to-show", window.show);
	// await addVote(db, "e4S1v_j_o", new Vote("choice1", "3365"));
	// await addPoll(db, new Poll(["choice 1", "choice 2"], new Date()));
};

const readTemplates = () => {
	return readdirSync(TEMPLATES_DIR)
		.filter(dir => dir.endsWith(".html"))
		.map(dir => resolve(TEMPLATES_DIR, dir));
};

const close = () => {
	if (server != null)
		server.kill("SIGKILL");
	app.exit(0);
	process.exit(0);
};

const startServer = (): ChildProcess => {
	return spawn("node", ["dist/server/server.js"], {stdio: "inherit"});
};

const initConfig = () => {
	if (!existsSync(TEMPLATES_DIR)) {
		mkdirSync(TEMPLATES_DIR, {recursive: true});
	}

	if (!existsSync(TEMPLATES_DIR)) {
		mkdirSync(TEMPLATES_DIR, {recursive: true});
	}

	if (dotenv.config({path: CONFIG_DIR}).error)
		throw "Invalid config";
};


const changeSlide = () => {
	const template = resolve(TEMPLATES_DIR, templates[temp_index]);
	const td: TemplateDataType = {template: readFileSync(template), index: temp_index, total: templates.length};
	window.webContents.send("template-set", td);
	temp_index++;
	temp_index = temp_index == templates.length ? 0 : temp_index;
};

ipcMain.on("template-get", (event: any, data: any) => {
	const td: TemplateDataType = {
		template: readFileSync(templates[data]),
		index: data,
		total: templates.length,
	};
	temp_index = ++data;
	temp_index = temp_index == templates.length ? 0 : temp_index;
	event.sender.send("template-set", td);
});
app.on("ready", main);
app.on("window-all-closed", close);
