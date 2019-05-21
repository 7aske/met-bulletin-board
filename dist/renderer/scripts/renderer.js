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
const electron_1 = require("electron");
const Store_1 = require("../../store/Store");
const Popup_1 = require("../../popup/Popup");
const updatePollId = () => {
    const data = store.getState("currentTemplate");
    const pollAnchor = document.querySelector("#poll-anchor");
    if (pollAnchor != undefined) {
        pollAnchor.setAttribute("data-id", data.id);
        pollAnchor.childNodes.forEach((e, i) => {
            const choice = e;
            e.addEventListener("click", ev => {
                const id = event.target.parentElement.attributes.getNamedItem("data-id").value;
                vote(id, choice.innerText, i + 1);
            });
        });
    }
};
const updateTemplateContainer = () => {
    const data = store.getState("currentTemplate");
    section.innerHTML = data.template.toString();
};
const updateIndicator = () => {
    const data = store.getState("currentTemplate");
    let len = indicatorContainer.children.length;
    if (len < data.total) {
        for (let i = 0; i < data.total - len; i++) {
            const div = document.createElement("DIV");
            div.classList.add("indicator");
            indicatorContainer.appendChild(div);
        }
    }
    else if (len > data.total) {
        while (len > data.total) {
            indicatorContainer.lastElementChild.remove();
            len--;
        }
    }
    indicatorContainer.querySelectorAll(".indicator").forEach((e, i) => {
        let element = e;
        if (i == data.index) {
            element.classList.add("active");
        }
        else {
            element.classList.remove("active");
        }
    });
};
const initialState = {
    "currentTemplate": null,
};
const store = new Store_1.Store(initialState);
store.subscribe("currentTemplate", [updateTemplateContainer, updateIndicator, updatePollId]);
const popupDialog = new Popup_1.PopupDialog(store);
const indicatorContainer = document.querySelector("#indicator-container");
const section = document.querySelector("main");
indicatorContainer.addEventListener("click", ev => {
    const event = ev;
    const element = document.elementFromPoint(event.x, event.y);
    if (element != null) {
        if (element.classList.contains("indicator")) {
            for (let i = 0; i < indicatorContainer.children.length; i++) {
                if (indicatorContainer.children[i] == element) {
                    electron_1.ipcRenderer.send("template-get", i);
                }
            }
        }
    }
});
window.onload = () => {
    electron_1.ipcRenderer.send("template-get", 0);
};
electron_1.ipcRenderer.on("template-reset", () => {
    section.innerHTML = "";
});
electron_1.ipcRenderer.on("template-set", (event, data) => {
    store.setState("currentTemplate", data);
});
const vote = (id, a, b) => {
    popupDialog.open("Are you sure?", "Are you sure you want to vote for '" + a + "' ?", () => __awaiter(this, void 0, void 0, function* () {
        const url = "http://127.0.0.1:5000/vote/" + id;
        const resp = yield fetch(url, {
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
            }),
            method: "POST",
            body: `choice=${a}&choiceId=${b}&studentIndex=${3333}`,
        });
        const json = yield resp.json();
        console.log(json);
    }));
};
