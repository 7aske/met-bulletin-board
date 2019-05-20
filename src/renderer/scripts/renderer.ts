import { ipcRenderer } from "electron";

const indicatorContainer = document.querySelector("#indicator-container") as HTMLDivElement;
const section = document.querySelector("main") as HTMLDivElement;

indicatorContainer.addEventListener("click", ev => {
	const event: MouseEvent = ev as MouseEvent;
	const element = document.elementFromPoint(event.x, event.y);
	if (element != null) {
		if (element.classList.contains("indicator")) {
			for (let i = 0; i < indicatorContainer.children.length; i++) {
				if (indicatorContainer.children[i] == element) {
					ipcRenderer.send("template-get", i);
				}
			}
		}
	}
});


window.onload = () => {
	ipcRenderer.send("template-get", 0);
};
ipcRenderer.on("template-reset", (event: any, data: any) => {
	section.innerHTML = "";
});
ipcRenderer.on("template-set", (event: any, data: TemplateDataType) => {
	section.innerHTML = data.template.toString();
	const pollAnchor = document.querySelector("#poll-anchor");
	if (pollAnchor != undefined) {
		pollAnchor.setAttribute("data-id", data.id);
	}
	let len = indicatorContainer.children.length;
	if (len < data.total) {
		for (let i = 0; i < data.total - len; i++) {
			const div = document.createElement("DIV");
			div.classList.add("indicator");
			indicatorContainer.appendChild(div);
		}
	} else if (len > data.total) {
		while (len > data.total) {
			indicatorContainer.lastElementChild.remove();
			len--;
		}
	}
	indicatorContainer.querySelectorAll(".indicator").forEach((e, i) => {

		let element = e as HTMLDivElement;
		if (i == data.index) {
			element.classList.add("active");
		} else {
			element.classList.remove("active");
		}
	});
});
