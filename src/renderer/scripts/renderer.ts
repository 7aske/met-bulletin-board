import { ipcRenderer } from "electron";

const indicatorContainer = document.querySelector("#indicator-container") as HTMLDivElement;
const frame = document.querySelector("iframe") as HTMLIFrameElement;
const section = document.querySelector("main section") as HTMLDivElement;

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

ipcRenderer.on("template-set", (event: any, data: TemplateDataType) => {
	section.innerHTML = data.template.toString();
	let len = indicatorContainer.children.length;
	if (len < data.total) {
		for (let i = 0; i < data.total - len; i++) {
			const div = document.createElement("DIV");
			div.classList.add("indicator");
			indicatorContainer.appendChild(div);
		}
	} else if (len > data.total) {
		indicatorContainer.lastElementChild.remove();
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


