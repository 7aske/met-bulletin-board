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
                const id = ev.target.parentElement.attributes.getNamedItem("data-id").value;
                vote(id, choice.childNodes[0].textContent, i);
            });
        });
    }
};
const updateTemplateContainer = () => {
    const data = store.getState("currentTemplate");
    section.innerHTML = data.template.toString();
    const pollAnchor = document.querySelector("#poll-anchor");
    if (pollAnchor != undefined) {
        pollAnchor.setAttribute("data-id", data.id);
        pollAnchor.childNodes.forEach((e, i) => __awaiter(this, void 0, void 0, function* () {
            const choice = e;
            const id = choice.parentElement.attributes.getNamedItem("data-id").value;
            const url = "http://127.0.0.1:5000/manage/polls/" + id + "/votes/" + i;
            const resp = yield fetch(url, {
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": store.getState("key"),
                }),
            });
            console.log(resp);
            const json = yield resp.json();
            choice.innerHTML += "<div style='font-size: " + pollAnchor.style.fontSize + "' class=\"badge badge-info position-relative float-right\">" + json.votes.length + "</div>";
        }));
    }
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
document.addEventListener("keydown", ev => {
    if (ev.key == "Escape") {
        if (store.getState("isPopUp")) {
            popupDialog.close.click();
        }
    }
});
const initialState = {
    "currentTemplate": null,
    "key": "",
};
const store = new Store_1.Store(initialState);
store.subscribe("currentTemplate", [updateTemplateContainer, updateIndicator, updatePollId]);
const popupDialog = new Popup_1.PopupDialog(store);
const backdrop = popupDialog.getBackdrop();
backdrop.addEventListener("click", ev => {
    if (ev.target == backdrop) {
        popupDialog.close.click();
    }
});
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
    const data = { id: "", index: 0, template: Buffer.from("", "utf-8"), total: 0 };
    store.setState("currentTemplate", data);
});
electron_1.ipcRenderer.on("key-set", (event, data) => {
    store.setState("key", data);
});
electron_1.ipcRenderer.on("template-set", (event, data) => {
    store.setState("currentTemplate", data);
});
/**
 * Function being called from renderer process on vote option click
 * Vote option must have:
 * @param id - id(index) of a student
 * @param choice - text of vote choice
 * @param choiceIndex - index of vote choice
 */
const vote = (id, choice, choiceIndex) => {
    console.log("wtf");
    popupDialog.open("Da li ste sigurni?", "<div>" +
        "<div class=\"alert-warning p-2\">Vas izbor je:&nbsp;&nbsp;'" + choice + "'</div><br>" +
        "<div class=\"input-group mb-3\">\n" +
        "  <div class=\"input-group-prepend\">\n" +
        "		<span class=\"input-group-text\" for=\"identity-input\">Indeks: </span>\n" +
        "	</div>\n" +
        "	<input type=\"text\" class=\"form-control\" placeholder=\"Indeks studenta\" aria-label=\"Indeks studenta\" id= \"identity-input\">\n" +
        "</div></div>", () => __awaiter(this, void 0, void 0, function* () {
        const identity = document.querySelector("#identity-input").value;
        if (identity != "") {
            const url = "http://127.0.0.1:5000/vote/" + id;
            const resp = yield fetch(url, {
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": store.getState("key"),
                }),
                method: "POST",
                body: `choice=${choice}&choiceId=${choiceIndex}&studentId=${identity}`,
            });
            if (resp.status == 400) {
                popupDialog.close.click();
                setTimeout(() => {
                    popupDialog.openType("Greska", "Vec ste glasali!", "danger");
                }, 500);
            }
            else {
                popupDialog.close.click();
                setTimeout(() => {
                    popupDialog.openType("Obavestenje", "Uspesno ste glasali!", "success");
                    updateTemplateContainer();
                    updatePollId();
                }, 500);
            }
        }
        else {
            popupDialog.close.click();
            setTimeout(() => {
                popupDialog.openType("Upozorenje", "Uneli ste pogresne podatke!", "danger");
            }, 500);
        }
    }));
};
