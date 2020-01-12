import { app, BrowserWindow, protocol, BrowserWindowConstructorOptions, screen, globalShortcut } from "electron";
import { ChildProcess, spawn } from "child_process";
import { normalize } from "path";
import { isDev } from "../server/utils/dev";
import { generateKey } from "../server/utils/authentication";
import { getMIMEType } from "../server/utils/mime";
import { existsSync, readFileSync } from "fs";

export const CLIENT_ROOT = "dist/bulletboard-frontend";
export const INDEX = "index.html";

let server: ChildProcess = null;
let window: BrowserWindow = null;

/**
 * Register app:// protocol for serving files to Electron app.
 */
protocol.registerSchemesAsPrivileged([{
	scheme: "app",
	privileges: {
		standard: true,
		secure: true,
		allowServiceWorkers: true,
		supportFetchAPI: true,
	},
}]);

const main = async () => {
	const key = generateKey();
	registerAppProtocol();
	server = startServer(key);
	let windowOpts: BrowserWindowConstructorOptions = {
		width: 1440,
		height: 900,
		title: "Bulletin Board",
	};
	if (!isDev()) {
		const {width, height} = screen.getPrimaryDisplay().workAreaSize;
		windowOpts["width"] = width;
		windowOpts["height"] = height;
		windowOpts["movable"] = false;
		windowOpts["minimizable"] = false;
		windowOpts["resizable"] = false;
		windowOpts["closable"] = false;
		windowOpts["frame"] = false;
		windowOpts["fullscreen"] = true;
		windowOpts["autoHideMenuBar"] = true;
		windowOpts["kiosk"] = true;
		globalShortcut.register("Alt+Tab", () => console.log("Alt+Tab"));
	}

	window = new BrowserWindow(windowOpts);
	await window.loadURL("app://" + INDEX);
	window.on("ready-to-show", window.show);
	isDev() && window.webContents.openDevTools();
	await window.webContents.executeJavaScript(`localStorage.setItem('Key', '${key}');`);
};

/**
 * Define app:// protocol and how it parses urls for serving content to the Electron client.
 */
const registerAppProtocol = () => {
	protocol.registerBufferProtocol("app", (req, callback) => {
		let url = req.url.substr(4);

		url = url.replace(/[/]$/, "");
		url = url.replace(/^[/]/, "");
		if (url !== "/" + INDEX) {
			url = url.replace(INDEX + "/", "");
		}
		url = CLIENT_ROOT + url;

		const path = normalize(`${process.cwd()}/${url}`);
		if (existsSync(path)) {
			const data = readFileSync(path);
			const mimeType = getMIMEType(path);
			callback({data, mimeType});
		}
	}, (error) => {
		if (error) console.error("Failed to register protocol");
	});
};

/**
 * Kill server on exit.
 */
const close = () => {
	if (server != null) {
		server.kill("SIGKILL");
		server = null;
	}
	app.exit(0);
	process.exit(0);
};

/**
 * Start API server with the authentication key required for Electron view.
 * @param key
 */
const startServer = (key: string) => {
	return spawn("node", ["dist/server/server.js"], {
		stdio: "inherit",
		env: {
			"KEY": key,
			// Inherit Electron env.
			"NODE_ENV": process.env.NODE_ENV,
		},
	});
};
app.on("browser-window-created", function (e: Event, window: BrowserWindow) {
	if (!isDev()) {
		window.setMenu(null);
	}
});
app.on("ready", main);
app.on("window-all-closed", close);
