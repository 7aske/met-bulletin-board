import { ipcRenderer } from "electron";

const frame = document.querySelector("iframe") as HTMLIFrameElement;

ipcRenderer.on("change-template", (event: any, data: any) => {
	console.log(data);
	frame.src = data;
});
