// TODO: admin page;

import { PollType } from "../../../@types/Poll";
import { VoteType } from "../../../@types/Vote";
import { DataStoreKeys, DataStoreTypes } from "./create";

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

export class PopupDialog {
	public confirm: HTMLButtonElement | null;
	public close: HTMLButtonElement | null;
	public popup: HTMLElement | null;
	private readonly backdrop: HTMLElement | null;
	private store: Store;

	constructor(store: Store) {
		this.store = store;
		this.initStates();
		PopupDialog.initStyleSheet();
		this.backdrop = PopupDialog.initBackdrop("popup-backdrop");
		this.popup = null;
		this.confirm = null;
		this.close = null;
	}

	public openType(title: string, body: string, type: string, cb?: Function) {
		this.createPopup(title, body, type);
		this.close.addEventListener("click", () => {
			this.destroyPopup();
		});
		if (cb) {
			this.confirm.addEventListener("click", () => {
				cb();
				this.destroyPopup();
			});
			this.confirm.style.display = "inline-block";
			setTimeout(() => this.close.click(), 20000);
		} else {
			this.confirm.style.display = "none";
			setTimeout(() => this.close.click(), 10000);
		}
		setTimeout(() => {
			this.popup.style.transform = "translateY(10vh)";
		}, 10);
		this.backdrop.style.visibility = "visible";
		this.backdrop.style.opacity = "1";
		this.store.setState("isPopUp", true);
	}

	public open(title: string, body: string, cb?: Function) {
		this.createPopup(title, body);
		this.close.addEventListener("click", () => {
			this.destroyPopup();
		});
		if (cb) {
			this.confirm.addEventListener("click", () => {
				cb();
				this.destroyPopup();
			});
			this.confirm.style.display = "inline-block";
			setTimeout(() => this.close.click(), 20000);
		} else {
			this.confirm.style.display = "none";
			setTimeout(() => this.close.click(), 10000);
		}
		setTimeout(() => {
			this.popup.style.transform = "translateY(10vh)";
		}, 10);
		this.backdrop.style.visibility = "visible";
		this.backdrop.style.opacity = "1";
		this.store.setState("isPopUp", true);
	}

	public destroyPopup() {
		this.popup.style.transform = "translateY(-10vh)";
		this.backdrop.style.backgroundColor = "background-color: rgba(0, 0, 0, 0)";
		setTimeout(() => {
			this.confirm.remove();
			this.close.remove();
			this.popup.remove();
			this.popup = null;
			this.confirm = null;
			this.close = null;
			this.backdrop.style.visibility = "hidden";
			this.store.setState("isPopUp", false);
			this.backdrop.style.color = "0";
		}, 100);
	}

	private createPopup(title: string, body: string, type?: string) {
		const html = `<div id="popup" class="card"><div class="card-header alert-${type ? type : "secondary"}"><h5 class="card-title mb-0">${title}</h5>
						</div><div class="card-body">${body}</div>
						<div class="card-footer">
							<button class="btn btn-secondary" id="popupClose">Zatvori</button>
							<button class="btn btn-success" id="popupConfirm">Potvrdi</button>
						</div></div>`;
		this.backdrop.innerHTML += html;
		this.popup = document.querySelector("#popup");
		this.confirm = document.querySelector("#popupConfirm");
		this.close = document.querySelector("#popupClose");
	}

	private static initStyleSheet() {
		const rule0 = `#popup-backdrop {
				transition: 100ms all;
				visibility: hidden;
				position: absolute;
				top:0;
				left:0;
				height: 100vh;
				width: 100vw;
				opacity: 1;
				background-color: rgba(0, 0, 0, 0.4);
				z-index: 2000;}`;
		const rule1 = `#popup-backdrop #popup {
				-webkit-transition: 200ms -webkit-transform;
				transition: 200ms -webkit-transform;
				transition: 200ms transform;
				transition: 200ms transform, 200ms -webkit-transform;
				width: 400px;
				min-height: 100px;
				max-height: 300px;
				margin: 20vh auto;}`;
		const rule2 = `#popup-backdrop #popup .card-body {
			  overflow-y: hidden;}`;
		const rule3 = `#popup-backdrop #popup .card-footer {
			  text-align: right;}`;
		const rule4 = `#popup-backdrop #popup #modalConfirm {
			  display: none;}`;
		const rules: string[] = [rule0, rule1, rule2, rule3, rule4];
		PopupDialog.addStyleSheet(rules);
	}

	private initStates() {
		this.store.registerState("isPopUp", false);
	}

	public getBackdrop(): HTMLElement {
		return this.backdrop;
	}

	public static addStyleSheet(rules: string[]) {
		const style = document.createElement("style") as HTMLStyleElement;
		style.appendChild(document.createTextNode(""));
		document.head.append(style);
		for (let i = 0; i < rules.length; i++) {
			(style.sheet as CSSStyleSheet).insertRule(rules[i], i);
		}
	}

	public static initBackdrop(id: string): HTMLElement {
		const bd = document.createElement("div");
		bd.id = id;
		document.body.appendChild(bd);
		return bd;
	}
}

const templateContainer = document.querySelector("#polls-container");
const initialState = {};
const store = new Store(initialState);
const popup = new PopupDialog(store);

window.onload = async () => {
	const res = await fetch("http://127.0.0.1:5000/manage/polls");
	const json: PollType[] = await res.json();
	json.forEach((p, i) => {
		templateContainer.innerHTML += pollTemplate(p, i);
	});
	updateButtons();
};

const updateButtons = async () => {
	const removeBtns = document.querySelectorAll(".btn-remove");
	console.log(removeBtns);
	removeBtns.forEach(async btn => {
		btn.addEventListener("click", async () => {
			const id = btn.attributes.getNamedItem("data-id").value;
			popup.openType("Upozorenje", "Da li zelite da obrisete '" + id + "'", "warning", async () => {
				const res = await fetch("http://127.0.0.1:5000/manage/polls/" + id, {
					method: "delete",
				});
				if (res.status == 200) {
					location.reload();
				}
			});
		});
	});

};

const pollTemplate = (poll: PollType, i: number) => {
	return `<div class="card border-bottom"> 
		<div class="card-header" id="heading${i}"> 
			<h2 class="mb-0 d-flex justify-content-between" style="cursor: pointer;" data-toggle="collapse" data-target="#collapse${i}" 
							aria-expanded="true" aria-controls="collapse${i}">
				<div>
					<button type="button" class="btn btn-primary font-weight-bold">
					  ID: <span class="badge badge-light">${poll.id}</span>
					</button>
					<button type="button" class="btn btn-primary font-weight-bold">
					  Votes: <span class="badge badge-light">${poll.votes.length}</span>
					</button>
				</div>
				<div>
					<button data-id="${poll.id}" class="btn btn-danger btn-remove">Remove</button> 
				</div>
			</h2> 
		</div> 
			<div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" 
				 data-parent="#polls-container"> 
				 <div class="p-4">
					ID: ${poll.id}
					Votes: ${poll.votes.length}
					Choices: [ ${Object.values(poll.choices).join(", ")} ]
				</div>
				<div class="card-body list-group list-group-flush"> 
					${poll.votes.map(v => voteTemplate(poll, v)).join("").toString()}
				</div> 
			</div> 
		</div>`;
};
const voteTemplate = (poll: PollType, vote: VoteType) => {
	return `<div class="list-group-item d-flex justify-content-around"><div class="w-25">${vote.id}</div><div class="w-25">${poll.choices[vote.choiceIndex]}</div><div class="w-25">${vote.studentId}</div><div class="w-25">${vote.dateVoted}</div></div>`;
};
