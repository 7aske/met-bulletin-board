import { app, BrowserWindow } from "electron";
import { ChildProcess, spawn } from "child_process";
import { resolve } from "path";
import { readdirSync } from "fs";
import { initDatabase } from "./database/initDatabase";
import ipcMain = Electron.ipcMain;

export const INDEX = resolve(process.cwd(), "dist/renderer/views/index.html");
export const TEMPLATES_DIR = resolve(process.cwd(), "templates");

let server: ChildProcess = null;
let db = null;
let temp_index = 0;
let window: BrowserWindow = null;

export let templates: string[] = readdirSync(TEMPLATES_DIR)
	.filter(dir => dir.endsWith(".html"))
	.map(dir => resolve(TEMPLATES_DIR, dir));

function close() {
	if (server != null)
		server.kill("SIGKILL");
	app.exit(0);
	process.exit(0);
}

function startServer(): ChildProcess {
	return spawn("node", ["dist/server/server.js"], {stdio: "inherit"});
}

async function main() {
	db = await initDatabase();
	// await addVote(db, "e4S1v_j_o", new Vote("choice1", "3365"));
	// await addPoll(db, new Poll(["choice 1", "choice 2"], new Date()));
	server = startServer();
	window = new BrowserWindow({
		width: 1440,
		height: 900,
		darkTheme: true,
		title: "Metropolitan Bulletin Board"
	});
	// window.setMenu(null);
	window.loadFile(INDEX);
	// window.loadFile(templates[temp_index]);
	const slideshowInterval = setInterval(changeSlide, 2000);

	window.on("ready-to-show", window.show);
}

function changeSlide() {
	const template = resolve(TEMPLATES_DIR, templates[temp_index]);
	window.webContents.send("change-template", template);
	temp_index++;
	temp_index = temp_index == templates.length ? 0 : temp_index;
}

// function changeSlide() {
// 	window.loadFile(resolve(TEMPLATES_DIR, templates[temp_index]));
// 	temp_index++;
// 	temp_index = temp_index == templates.length ? 0 : temp_index;
// }

app.on("ready", main);
app.on("window-all-closed", close);
