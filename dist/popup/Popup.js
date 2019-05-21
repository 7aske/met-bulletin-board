"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PopupDialog {
    constructor(store) {
        this.store = store;
        this.initStates();
        this.initStyleSheet();
        this.backdrop = PopupDialog.initBackdrop("popup-backdrop");
        this.popup = null;
        this.confirm = null;
        this.close = null;
    }
    open(title, body, cb) {
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
        }
        setTimeout(() => {
            this.popup.style.transform = "translateY(10vh)";
        }, 10);
        this.backdrop.style.visibility = "visible";
        this.backdrop.style.opacity = "1";
        this.store.setState("isPopUp", true);
    }
    destroyPopup() {
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
    createPopup(title, body) {
        const html = `<div id="popup" class="card"><div class="card-header"><h5 class="card-title mb-0">${title}</h5>
						</div><div class="card-body">${body}</div>
						<div class="card-footer">
							<button class="btn btn-secondary" id="popupClose">Zatvori</button>
							<button class="btn btn-primary" id="popupConfirm">Potvrdi</button>
						</div></div>`;
        this.backdrop.innerHTML += html;
        this.popup = document.querySelector("#popup");
        this.confirm = document.querySelector("#popupConfirm");
        this.close = document.querySelector("#popupClose");
    }
    initStyleSheet() {
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
				width: 600px;
				height: 300px;
				margin: 20vh auto;}`;
        const rule2 = `#popup-backdrop #popup .card-body {
			  overflow-y: hidden;}`;
        const rule3 = `#popup-backdrop #popup .card-footer {
			  text-align: right;}`;
        const rule4 = `#popup-backdrop #popup #modalConfirm {
			  display: none;}`;
        const rules = [rule0, rule1, rule2, rule3, rule4];
        PopupDialog.addStyleSheet(rules);
    }
    initStates() {
        this.store.registerState("isPopUp", false);
    }
    getBackdrop() {
        return this.backdrop;
    }
    static addStyleSheet(rules) {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.append(style);
        for (let i = 0; i < rules.length; i++) {
            style.sheet.insertRule(rules[i], i);
        }
    }
    static initBackdrop(id) {
        const bd = document.createElement("div");
        bd.id = id;
        document.body.appendChild(bd);
        return bd;
    }
}
exports.PopupDialog = PopupDialog;
