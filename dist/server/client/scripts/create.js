"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var navbarTemplateControls = document.querySelector("#navbar-template-controls");
var templateControlsToggler = document.querySelector("#navbar-toggler");
var templateContainer = document.querySelector("#template-container");
var templateType = document.querySelector("#template-type");
var templateBgInp = document.querySelector("#template-background");
var templatePollControlCont = document.querySelector("#template-poll-controls");
var btnAddOption = document.querySelector("#btn-add-option");
var templatePollOptionCont = document.querySelector("#poll-option-container");
var templatePollOptionInp = document.querySelector("#poll-option-input");
var pollAnchor = document.querySelector("#poll-anchor");
var templateTextControlCheck = document.querySelector("#template-text-checkbox");
var templateTextControlCont = document.querySelector("#template-text-controls");
var templateTextControlInp = document.querySelector("#template-text-controls textarea");
var templateTextHeadInp = document.querySelector("#template-head-content");
var templateTextControlSize = document.querySelector("#template-text-size");
var templateTextControlPosition = document.querySelector("#template-text-position");
var textJumbotron = document.querySelector(".jumbotron");
var textJumbotronHeader = document.querySelector(".jumbotron h3");
var textJumbotronContent = document.querySelector(".jumbotron p");
var submitBtn = document.querySelector("#submit-btn");
var state = {
    pollOptions: [],
    currentTemplate: "blank",
};
templateContainer.addEventListener("click", function () {
    var ariaExpanded = templateControlsToggler.attributes.getNamedItem("aria-expanded");
    if (ariaExpanded.value != "false") {
        navbarTemplateControls.classList.remove("show");
        ariaExpanded.value = "false";
    }
});
templateControlsToggler.addEventListener("click", function () {
    var ariaExpanded = templateControlsToggler.attributes.getNamedItem("aria-expanded");
    if (ariaExpanded.value == "false") {
        navbarTemplateControls.classList.add("show");
        ariaExpanded.value = "true";
    }
    else {
        navbarTemplateControls.classList.remove("show");
        ariaExpanded.value = "false";
    }
});
templateBgInp.addEventListener("change", function () {
    var image = templateBgInp.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        templateContainer.firstElementChild.style.backgroundImage = "url(\"" + reader.result + "\")";
    };
    if (image) {
        reader.readAsDataURL(image);
    }
    else {
        templateContainer.firstElementChild.style.backgroundImage = "";
    }
});
templateTextControlCheck.addEventListener("change", function () {
    if (templateTextControlCheck.checked) {
        templateTextControlCont.classList.remove("d-none");
        textJumbotron.classList.remove("d-none");
    }
    else {
        templateTextControlCont.classList.add("d-none");
        textJumbotron.classList.add("d-none");
    }
});
templateTextControlSize.addEventListener("mousemove", function () {
    textJumbotronContent.style.fontSize = templateTextControlSize.value + "px";
    pollAnchor.style.fontSize = templateTextControlSize.value + "px";
    textJumbotronHeader.style.fontSize = (parseInt(templateTextControlSize.value) + 24) + "px";
});
templateTextControlPosition.addEventListener("mousemove", function () {
    textJumbotron.style.top = templateTextControlPosition.value + "%";
});
templateTextControlInp.addEventListener("keyup", function () {
    textJumbotronContent.innerText = templateTextControlInp.value;
});
templateTextHeadInp.addEventListener("keyup", function () {
    textJumbotronHeader.innerText = templateTextHeadInp.value;
});
templateType.addEventListener("change", function () {
    var val = templateType.value;
    switch (val) {
        case "poll":
            templatePollControlCont.classList.remove("d-none");
            state.currentTemplate = "poll";
            templateTextControlCheck.click();
            break;
        case "blank":
            templatePollControlCont.classList.add("d-none");
            state.currentTemplate = "blank";
            break;
        case "upload":
            templatePollControlCont.classList.add("d-none");
            state.currentTemplate = "upload";
            break;
        default:
            templatePollControlCont.classList.add("d-none");
            state.currentTemplate = "blank";
    }
    console.log(templateType.value);
});
btnAddOption.addEventListener("click", function () {
    var val = templatePollOptionInp.value.trim();
    if (val != "") {
        state.pollOptions.push(val);
        templatePollOptionCont.innerHTML += optionListTemplate(val);
        templatePollOptionInp.value = "";
        renderPoll();
    }
});
var pollTemplate = function (opt, i) {
    return "<li class=\"list-group-item bg-transparent text-dark\" style=\"cursor: pointer;\" onclick=\"vote(event, '" + opt + "', " + i + ")\">" + opt + "</li>";
};
var renderPoll = function () {
    if (state.currentTemplate == "poll") {
        pollAnchor.innerHTML = "";
        state.pollOptions.forEach(function (p, i) {
            pollAnchor.innerHTML += pollTemplate(p, i);
        });
    }
};
var optionListTemplate = function (opt) {
    var len = state.pollOptions.length;
    return "<div class=\"row\" id=\"opt-" + (len - 1) + "\">\n\t\t\t<div class=\"col-10\"><b>" + len + ". " + opt + "</b></div>\n\t\t\t<div class=\"col-2\"><button type=\"button\" onclick=\"(function (opt) {\n\t\t\t\tdocument.querySelector('#opt-" + (len - 1) + "').remove();\n\t\t\t    state.pollOptions = state.pollOptions.filter(o => {\n\t\t\t    \treturn o !== opt;\n\t\t\t    });\n\t\t\t})('" + opt + "')\" class=\"btn text-light font-weight-bold\" style=\"margin-top: -6px\">&times;</button></div>\n\t\t\t</div>";
};
submitBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var content, choices, url, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = templateContainer.innerHTML.replace(/[\t]/g, "");
                choices = state.pollOptions;
                url = window.location.origin + "/create";
                return [4 /*yield*/, fetch(url, {
                        body: JSON.stringify({ content: content, choices: choices }),
                        method: "post",
                        headers: new Headers({ "Content-Type": "application/json" }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                console.log(json);
                return [2 /*return*/];
        }
    });
}); });
