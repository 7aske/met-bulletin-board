import { app, ipcMain, BrowserWindow } from "electron";

let window: BrowserWindow = null;

app.on("ready", () => {
	window = new BrowserWindow({width: 800, height: 600, resizable: false});
	window.on("ready-to-show", ()=> window.loadFile("dist/renderer/views/index.html"))
});

app.on("window-all-closed", ()=> {
	window = null;
	app.exit(0);
});
