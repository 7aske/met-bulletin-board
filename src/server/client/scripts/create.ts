export type DataStoreTypes = boolean | number | string | string[] | null ;
export type DataStoreKeys = "isPopUp" | "currentTemplate" | "pollOptions";

export interface DataStore {
	readonly state: State;
	readonly _state: _State;

	setState(state: DataStoreKeys, value: DataStoreTypes): DataStoreTypes;

	getState(state: DataStoreKeys): DataStoreTypes;

	registerState(state: DataStoreKeys, value: DataStoreTypes): void;

	subscribe(state: DataStoreKeys, actions: Function[]): void;

	getStateObject?(): _State;
}

export interface _State {
	[key: string]: _StateProp;
}

export interface State {
	[key: string]: DataStoreTypes;
}

export interface _StateProp {
	value: DataStoreTypes;
	actions: Function[];
}

export class Store implements DataStore {
	public readonly _state: _State = {};
	public readonly state: State = {};

	constructor(initialState: State) {
		Object.keys(initialState).forEach(key => {
			this._state[key] = {value: initialState[key], actions: []};
		});
		this.state = initialState;
	}

	public setState(name: DataStoreKeys, state: DataStoreTypes): DataStoreTypes {
		if (Object.keys(this._state).indexOf(name) == -1) {
			throw new Error("State must be registered first");
		} else {
			this.set(name, state);
			if (this._state[name].actions) {
				this._state[name].actions.forEach(action => {
					action();
				});
			}
		}
		return this.state[name];
	}

	public registerState(name: DataStoreKeys, initialState: DataStoreTypes) {
		if (Object.keys(this.state).indexOf(name) != -1) {
			throw new Error("State already exists");
		} else {
			this.set(name, initialState);
		}
	}

	public getState(name: DataStoreKeys): any {
		if (Object.keys(this.state).indexOf(name) == -1) {
			throw new Error("State is not registered - '" + name + "'");
		} else {
			return this.state[name];
		}
	}

	public subscribe(name: DataStoreKeys, actions: Function[]) {
		if (Object.keys(this._state).indexOf(name) == -1) {
			throw new Error("State is not registered");
		} else {
			this._state[name].actions = actions;
		}
	}

	public getStateObject() {
		return this._state;
	}

	private set(name: DataStoreKeys, state: DataStoreTypes) {
		if (Object.keys(this.state).indexOf(name) == -1) {
			this.state[name] = state;
			this._state[name] = {value: state, actions: []};
		} else {
			this._state[name].value = state;
			this.state[name] = state;
		}
	}
}

const navbarTemplateControls = document.querySelector("#navbar-template-controls") as HTMLDivElement;
const templateControlsToggler = document.querySelector("#navbar-toggler") as HTMLButtonElement;

const templateContainer = document.querySelector("#template-container") as HTMLDivElement;

const templateType = document.querySelector("#template-type") as HTMLSelectElement;
const templateBgInp = document.querySelector("#template-background") as HTMLInputElement;
const templateBgBtnClear = document.querySelector("#template-background-clear") as HTMLButtonElement;

const templateTextColorContent = document.querySelector("#template-color-content") as HTMLInputElement;
const templateTextColorBackdrop = document.querySelector("#template-color-backdrop") as HTMLInputElement;

const templatePollControlCont = document.querySelector("#template-poll-controls") as HTMLDivElement;

const btnAddOption = document.querySelector("#btn-add-option") as HTMLButtonElement;
const templatePollOptionCont = document.querySelector("#poll-option-container") as HTMLDivElement;
const templatePollOptionInp = document.querySelector("#poll-option-input") as HTMLInputElement;
const pollAnchor = document.querySelector("#poll-anchor") as HTMLDivElement;

const templateTextControlCheck = document.querySelector("#template-text-checkbox") as HTMLInputElement;
const templateTextControlCont = document.querySelector("#template-text-controls") as HTMLDivElement;
const templateTextControlInp = document.querySelector("#template-text-controls textarea") as HTMLTextAreaElement;
const templateTextHeadInp = document.querySelector("#template-head-content") as HTMLInputElement;
const templateTextControlSize = document.querySelector("#template-text-size") as HTMLInputElement;
const templateTextControlPosition = document.querySelector("#template-text-position") as HTMLInputElement;

const textJumbotron = document.querySelector(".jumbotron") as HTMLDivElement;
const textJumbotronHeader = document.querySelector(".jumbotron h3") as HTMLHeadingElement;
const textJumbotronContent = document.querySelector(".jumbotron p") as HTMLParagraphElement;

const submitBtn = document.querySelector("#submit-btn") as HTMLButtonElement;

const initialState: State = {
	pollOptions: [],
	currentTemplate: "blank",
};

const store = new Store(initialState);

const renderPollTemplates = () => {
	if (store.getState("currentTemplate") == "poll") {
		pollAnchor.innerHTML = "";
		(store.getState("pollOptions") as string[]).forEach((p, i) => {
			pollAnchor.innerHTML += pollTemplate(p, i + 1);
		});
	}
};

const renderOptionTemplates = () => {
	if (store.getState("currentTemplate") == "poll") {
		templatePollOptionCont.innerHTML = "";
		console.log(store.state);
		(store.getState("pollOptions") as string[]).forEach((p, i) => {
			templatePollOptionCont.innerHTML += optionTemplate(p, i + 1);
		});
	}
};

const updateControls = () => {
	if (store.getState("currentTemplate") === "poll") {
		templatePollControlCont.classList.remove("d-none");
	} else {
		templatePollControlCont.classList.add("d-none");
		pollAnchor.innerHTML = "";
		templatePollOptionCont.innerHTML = "";
	}
	if (!templateTextControlCheck.checked) {
		templateTextControlCheck.click();
	}
};
store.subscribe("currentTemplate", [updateControls, renderPollTemplates, renderOptionTemplates]);
store.subscribe("pollOptions", [renderOptionTemplates, renderPollTemplates]);

templateContainer.addEventListener("click", () => {
	const ariaExpanded = templateControlsToggler.attributes.getNamedItem("aria-expanded");
	if (ariaExpanded.value != "false") {
		navbarTemplateControls.classList.remove("show");
		ariaExpanded.value = "false";
	}
});

templateControlsToggler.addEventListener("click", () => {
	const ariaExpanded = templateControlsToggler.attributes.getNamedItem("aria-expanded");
	if (ariaExpanded.value == "false") {
		navbarTemplateControls.classList.add("show");
		ariaExpanded.value = "true";
	} else {
		navbarTemplateControls.classList.remove("show");
		ariaExpanded.value = "false";
	}
});

templateBgBtnClear.addEventListener("click", () => {
	(templateContainer.firstElementChild as HTMLDivElement).style.backgroundImage = "";
});

templateBgInp.addEventListener("change", () => {
	const image = templateBgInp.files[0];
	const reader = new FileReader();
	reader.onload = () => {
		(templateContainer.firstElementChild as HTMLDivElement).style.backgroundImage = `url("${reader.result}")`;
	};
	if (image) {
		reader.readAsDataURL(image);
	} else {
		(templateContainer.firstElementChild as HTMLDivElement).style.backgroundImage = "";
	}
});

templateTextControlCheck.addEventListener("change", () => {
	if (templateTextControlCheck.checked) {
		templateTextControlCont.classList.remove("d-none");
		textJumbotron.classList.remove("d-none");
	} else {
		templateTextControlCont.classList.add("d-none");
		textJumbotron.classList.add("d-none");
	}
});

templateTextControlSize.addEventListener("mousemove", () => {
	textJumbotronContent.style.fontSize = templateTextControlSize.value + "px";
	pollAnchor.style.fontSize = templateTextControlSize.value + "px";
	textJumbotronHeader.style.fontSize = (parseInt(templateTextControlSize.value) + 24) + "px";
});

templateTextControlPosition.addEventListener("mousemove", () => {
	textJumbotron.style.top = templateTextControlPosition.value + "%";
});

templateTextControlInp.addEventListener("keyup", () => {
	textJumbotronContent.innerText = templateTextControlInp.value;
});
templateTextHeadInp.addEventListener("keyup", () => {
	textJumbotronHeader.innerText = templateTextHeadInp.value;
});

templateType.addEventListener("change", () => {
	const val = templateType.value;
	store.setState("currentTemplate", val);
});

// templateTextColorContent.addEventListener("change", ()=>{
// 	console.log(templateTextColorContent.value);
// });
//
// templateTextColorBackdrop.addEventListener("change", ()=>{
// 	console.log(templateTextColorBackdrop.value);
// });

templatePollOptionInp.addEventListener("keydown", ev => {
	if (ev.key.toUpperCase() == "ENTER") {
		ev.preventDefault();
		const val = templatePollOptionInp.value.trim();
		addOption(val);
	}
});

btnAddOption.addEventListener("click", () => {
	const val = templatePollOptionInp.value.trim();
	addOption(val);
});

const addOption = (val: string) => {
	if (val != "") {
		const options: string[] = store.getState("pollOptions");
		options.push(val);
		store.setState("pollOptions", options);
		templatePollOptionInp.value = "";
	}
};

const pollTemplate = (opt: string, i: number): string => {
	return `<li class="list-group-item bg-transparent text-dark" style="cursor: pointer;">${opt}</li>`;
};


const optionTemplate = (opt: string, len: number): string => {
	return `<div class="row" id="opt-${len - 1}">
			<div class="col-10"><b>${len}. ${opt}</b></div>
			<div class="col-2"><button type="button" onclick="(function (opt) {
			    store.setState('pollOptions', store.getState('pollOptions').filter(o => {
			    	return o !== opt;
			    });)
			})('${opt}')" class="btn text-light font-weight-bold" style="margin-top: -6px">&times;</button></div>
			</div>`;
};


submitBtn.addEventListener("click", async () => {
	const content = templateContainer.innerHTML.replace(/[\t]/g, "");
	const choices: any = {};
	(store.getState("pollOptions") as string[]).forEach((o, i) => {
		choices[i] = o;
	});
	const url = window.location.origin + "/create";
	const response = await fetch(url, {
		body: JSON.stringify({content, choices}),
		method: "post",
		headers: new Headers({"Content-Type": "application/json"}),
	});
	const json = await response.json();
	console.log(json);
	alert(json);
});
