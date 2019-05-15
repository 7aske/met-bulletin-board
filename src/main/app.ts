import { app, ipcMain, BrowserWindow } from "electron";

let window: BrowserWindow = null;

app.on("ready", () => {
	window = new BrowserWindow({width: 800, height: 600, resizable: false});
	const fp = process.cwd() + "/dist/renderer/views/index.html";
	console.log(fp);
	window.on("ready-to-show", ()=> window.loadFile(fp))
});

app.on("window-all-closed", ()=> {
	window = null;
	app.exit(0);
});
