"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(initialState) {
        this._state = {};
        this.state = {};
        Object.keys(initialState).forEach(key => {
            this._state[key] = { value: initialState[key], actions: [] };
        });
        this.state = initialState;
    }
    setState(name, state) {
        if (Object.keys(this._state).indexOf(name) == -1) {
            throw new Error("State must be registered first");
        }
        else {
            this.set(name, state);
            if (this._state[name].actions) {
                this._state[name].actions.forEach(action => {
                    action();
                });
            }
        }
        return this.state[name];
    }
    registerState(name, initialState) {
        if (Object.keys(this.state).indexOf(name) != -1) {
            throw new Error("State already exists");
        }
        else {
            this.set(name, initialState);
        }
    }
    getState(name) {
        if (Object.keys(this.state).indexOf(name) == -1) {
            throw new Error("State is not registered - '" + name + "'");
        }
        else {
            return this.state[name];
        }
    }
    subscribe(name, actions) {
        if (Object.keys(this._state).indexOf(name) == -1) {
            throw new Error("State is not registered");
        }
        else {
            this._state[name].actions = actions;
        }
    }
    getStateObject() {
        return this._state;
    }
    set(name, state) {
        if (Object.keys(this.state).indexOf(name) == -1) {
            this.state[name] = state;
            this._state[name] = { value: state, actions: [] };
        }
        else {
            this._state[name].value = state;
            this.state[name] = state;
        }
    }
}
exports.Store = Store;
const navbarTemplateControls = document.querySelector("#navbar-template-controls");
const templateControlsToggler = document.querySelector("#navbar-toggler");
const templateContainer = document.querySelector("#template-container");
const templateType = document.querySelector("#template-type");
const templateBgInp = document.querySelector("#template-background");
const templateBgBtnClear = document.querySelector("#template-background-clear");
const templateTextColorContent = document.querySelector("#template-color-content");
const templateTextColorBackdrop = document.querySelector("#template-color-backdrop");
const templatePollControlCont = document.querySelector("#template-poll-controls");
const btnAddOption = document.querySelector("#btn-add-option");
const templatePollOptionCont = document.querySelector("#poll-option-container");
const templatePollOptionInp = document.querySelector("#poll-option-input");
const pollAnchor = document.querySelector("#poll-anchor");
const templateTextControlCheck = document.querySelector("#template-text-checkbox");
const templateTextControlCont = document.querySelector("#template-text-controls");
const templateTextControlInp = document.querySelector("#template-text-controls textarea");
const templateTextHeadInp = document.querySelector("#template-head-content");
const templateTextControlSize = document.querySelector("#template-text-size");
const templateTextControlPosition = document.querySelector("#template-text-position");
const textJumbotron = document.querySelector(".jumbotron");
const textJumbotronHeader = document.querySelector(".jumbotron h3");
const textJumbotronContent = document.querySelector(".jumbotron p");
const submitBtn = document.querySelector("#submit-btn");
const initialState = {
    pollOptions: [],
    currentTemplate: "blank",
};
const store = new Store(initialState);
const renderPollTemplates = () => {
    if (store.getState("currentTemplate") == "poll") {
        pollAnchor.innerHTML = "";
        store.getState("pollOptions").forEach((p, i) => {
            pollAnchor.innerHTML += pollTemplate(p, i);
        });
    }
};
const renderOptionTemplates = () => {
    if (store.getState("currentTemplate") == "poll") {
        templatePollOptionCont.innerHTML = "";
        console.log(store.state);
        store.getState("pollOptions").forEach((p, i) => {
            templatePollOptionCont.innerHTML += optionTemplate(p, i + 1);
        });
    }
};
const updateControls = () => {
    if (store.getState("currentTemplate") === "poll") {
        templatePollControlCont.classList.remove("d-none");
    }
    else {
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
    }
    else {
        navbarTemplateControls.classList.remove("show");
        ariaExpanded.value = "false";
    }
});
templateBgBtnClear.addEventListener("click", () => {
    templateContainer.firstElementChild.style.backgroundImage = "";
});
templateBgInp.addEventListener("change", () => {
    const image = templateBgInp.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        templateContainer.firstElementChild.style.backgroundImage = `url("${reader.result}")`;
    };
    if (image) {
        reader.readAsDataURL(image);
    }
    else {
        templateContainer.firstElementChild.style.backgroundImage = "";
    }
});
templateTextControlCheck.addEventListener("change", () => {
    if (templateTextControlCheck.checked) {
        templateTextControlCont.classList.remove("d-none");
        textJumbotron.classList.remove("d-none");
    }
    else {
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
const addOption = (val) => {
    if (val != "") {
        const options = store.getState("pollOptions");
        options.push(val);
        store.setState("pollOptions", options);
        templatePollOptionInp.value = "";
    }
};
const pollTemplate = (opt, i) => {
    return `<li class="list-group-item bg-transparent text-dark" style="cursor: pointer;">${opt}</li>`;
};
const optionTemplate = (opt, len) => {
    return `<div class="row" id="opt-${len - 1}">
			<div class="col-10"><b>${len}. ${opt}</b></div>
			<div class="col-2"><button type="button" onclick="(function (opt) {
			    store.setState('pollOptions', store.getState('pollOptions').filter(o => {
			    	return o !== opt;
			    });)
			})('${opt}')" class="btn text-light font-weight-bold" style="margin-top: -6px">&times;</button></div>
			</div>`;
};
submitBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
    const content = templateContainer.innerHTML.replace(/[\t]/g, "");
    const choices = {};
    store.getState("pollOptions").forEach((o, i) => {
        choices[i] = o;
    });
    const url = window.location.origin + "/create";
    const response = yield fetch(url, {
        body: JSON.stringify({ content, choices }),
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
    });
    const json = yield response.json();
    console.log(json);
    alert(json);
}));
