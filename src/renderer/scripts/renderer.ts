import { ipcRenderer } from "electron";
import { Store } from "../../store/Store";
import { State } from "../../@types/DataStore";
import { PopupDialog } from "../../popup/Popup";

const updatePollId = () => {
	const data: TemplateDataType = store.getState("currentTemplate");
	const pollAnchor = document.querySelector("#poll-anchor");
	if (pollAnchor != undefined) {
		pollAnchor.setAttribute("data-id", data.id);
		pollAnchor.childNodes.forEach((e, i) => {
			const choice = e as HTMLLIElement;
			e.addEventListener("click", ev => {
				const id = (event.target as HTMLElement).parentElement.attributes.getNamedItem("data-id").value;
				vote(id, choice.innerText, i + 1);
			});
		});
	}
};

const updateTemplateContainer = () => {
	const data: TemplateDataType = store.getState("currentTemplate");
	section.innerHTML = data.template.toString();
};

const updateIndicator = () => {
	const data: TemplateDataType = store.getState("currentTemplate");
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
};

const initialState: State = {
	"currentTemplate": null,
};
const store = new Store(initialState);
store.subscribe("currentTemplate", [updateTemplateContainer, updateIndicator, updatePollId]);
const popupDialog = new PopupDialog(store);
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

ipcRenderer.on("template-reset", () => {
	section.innerHTML = "";
});

ipcRenderer.on("template-set", (event: any, data: TemplateDataType) => {
	store.setState("currentTemplate", data);
});

const vote = (id: string, choice: string, choiceIndex: number) => {
	popupDialog.open("Are you sure?", "<div class=\"input-group mb-3\">\n" +
		"  <div class=\"input-group-prepend\">\n" +
		"		<span class=\"input-group-text\" for=\"identity-input\">ID: </span>\n" +
		"	</div>\n" +
		"	<input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\" id= \"identity-input\">\n" +
		"</div>\n", async () => {
		const identity = (<HTMLInputElement>document.querySelector("#identity-input")).value;
		if (identity != "") {
			const url = "http://127.0.0.1:5000/vote/" + id;
			const resp = await fetch(url, {
				headers: new Headers({
					"Content-Type": "application/x-www-form-urlencoded",
					"Access-Control-Allow-Origin": "*",
				}),
				method: "POST",
				body: `choice=${choice}&choiceId=${choiceIndex}&studentIndex=${identity}`,
			});
			const json = await resp.json();
			console.log(json);
		} else {
			popupDialog.open("Warrning","FirstName.LastName.Index");
		}
	});
};



