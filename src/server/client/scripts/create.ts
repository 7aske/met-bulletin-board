const navbarTemplateControls = document.querySelector("#navbar-template-controls") as HTMLDivElement;
const templateControlsToggler = document.querySelector("#navbar-toggler") as HTMLButtonElement;

const templateContainer = document.querySelector("#template-container") as HTMLDivElement;

const templateType = document.querySelector("#template-type") as HTMLSelectElement;
const templateBgInp = document.querySelector("#template-background") as HTMLInputElement;

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

const state: any = {
	pollOptions: [],
	currentTemplate: "blank",
};

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
	switch (val) {
		case "poll":
			templatePollControlCont.classList.remove("d-none");
			state.currentTemplate = "poll";
			if (!templateTextControlCheck.checked) {
				templateTextControlCheck.click();
			}
			renderOptionTemplates();
			renderPollTemplates();
			break;
		case "blank":
			templatePollControlCont.classList.add("d-none");
			state.currentTemplate = "blank";
			if (templateTextControlCheck.checked) {
				templateTextControlCheck.click();
			}
			clearPoll();
			break;
		case "upload":
			templatePollControlCont.classList.add("d-none");
			state.currentTemplate = "upload";
			clearPoll();
			break;
		default:
			templatePollControlCont.classList.add("d-none");
			state.currentTemplate = "blank";
			clearPoll();
	}
	console.log(templateType.value);

});
btnAddOption.addEventListener("click", () => {
	const val = templatePollOptionInp.value.trim();
	if (val != "") {
		state.pollOptions.push(val);
		renderOptionTemplates();
		renderPollTemplates();
		templatePollOptionInp.value = "";
	}
});

const pollTemplate = (opt: string, i: number): string => {
	return `<li class="list-group-item bg-transparent text-dark" style="cursor: pointer;" onclick="vote(event, '${opt}', ${i})">${opt}</li>`;
};


const renderPollTemplates = () =>{
	if (state.currentTemplate == "poll") {
		pollAnchor.innerHTML = "";
		(state.pollOptions as string[]).forEach((p, i) => {
			pollAnchor.innerHTML += pollTemplate(p, i + 1);
		});
	}
};

const renderOptionTemplates = () => {
	if (state.currentTemplate == "poll") {
		templatePollOptionCont.innerHTML = "";
		(state.pollOptions as string[]).forEach((p, i) => {
			templatePollOptionCont.innerHTML += optionTemplate(p, i + 1);
		});
	}
};

const optionTemplate = (opt: string, len: number): string => {
	return `<div class="row" id="opt-${len - 1}">
			<div class="col-10"><b>${len}. ${opt}</b></div>
			<div class="col-2"><button type="button" onclick="(function (opt) {
			    state.pollOptions = state.pollOptions.filter(o => {
			    	return o !== opt;
			    });
			    renderOptionTemplates();
			    renderPollTemplates();
			})('${opt}')" class="btn text-light font-weight-bold" style="margin-top: -6px">&times;</button></div>
			</div>`;
};

const clearPoll = () => {
	if (state.currentTemplate != "poll") {
		pollAnchor.innerHTML = "";
		templatePollOptionCont.innerHTML = "";
	}
};
submitBtn.addEventListener("click", async () => {
	const content = templateContainer.innerHTML.replace(/[\t]/g, "");
	const choices = state.pollOptions;
	const url = window.location.origin + "/create";
	const response = await fetch(url, {
		body: JSON.stringify({content, choices}),
		method: "post",
		headers: new Headers({"Content-Type": "application/json"}),
	});
	const json = await response.json();
	console.log(json);
});
