import { app, ipcMain, BrowserWindow } from "electron";
import { ChildProcess, spawn } from "child_process";
import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync";
import { resolve } from "path";

const INDEX = resolve(process.cwd(), "dist/renderer/views/index.html");
const DB_PATH = resolve(process.cwd(), "database/db.json");

const adapter = new FileSync(DB_PATH)
const db = low(adapter);
db.defaults({polls:[]});
db.write();
// @ts-ignore
db.get("polls").push({});
db.write();

let window: BrowserWindow = null;
let server: ChildProcess = null;

function main() {
	startServer();
	window = new BrowserWindow({
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
	app.exit(0);
}

function startServer() {
	try {
		server = spawn("node", ["dist/server/server.js"], {stdio: "inherit"});
	} catch (e) {
		throw e;
	}
}

app.on("ready", main);
app.on("window-all-closed", close);
