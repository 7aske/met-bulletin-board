import { app, ipcMain, BrowserWindow } from "electron";

const INDEX = process.cwd() + "/dist/renderer/views/index.html";
let window: BrowserWindow = null;

function main() {
	window = new BrowserWindow({
		width: 1440,
		height: 900,
		// fullscreen: true,
		darkTheme: true,
	});
	window.loadFile(INDEX);
	window.on("ready-to-show", window.show);
}

app.on("ready", main);
app.on("window-all-closed", () => app.exit(0));
