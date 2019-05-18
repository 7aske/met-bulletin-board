const navbarTemplateControls = document.querySelector("#navbar-template-controls") as HTMLDivElement;
const templateControlsToggler = document.querySelector("#navbar-toggler") as HTMLButtonElement;

const templateContainer = document.querySelector("#template-container") as HTMLDivElement;

const templateType = document.querySelector("#template-type") as HTMLSelectElement;
const templateBgInp = document.querySelector("#template-background") as HTMLInputElement;

const templateTextControlCheck = document.querySelector("#template-text-checkbox") as HTMLInputElement;
const templateTextControlCont = document.querySelector("#template-text-controls") as HTMLDivElement;
const templateTextControlInp = document.querySelector("#template-text-controls textarea") as HTMLTextAreaElement;
const templateTextControlSize = document.querySelector("#template-text-size") as HTMLInputElement;
const templateTextControlPosition = document.querySelector("#template-text-position") as HTMLInputElement;

const textJumbotron = document.querySelector(".jumbotron") as HTMLDivElement;
const textJumbotronHeader = document.querySelector(".jumbotron h3") as HTMLHeadingElement;
const textJumbotronContent = document.querySelector(".jumbotron p") as HTMLParagraphElement;

const submitBtn = document.querySelector("#submit-btn") as HTMLButtonElement;

templateContainer.addEventListener("click", ()=>{
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
	textJumbotronHeader.style.fontSize = (parseInt(templateTextControlSize.value) + 24) + "px";
});

templateTextControlPosition.addEventListener("mousemove", () => {
	textJumbotron.style.top = templateTextControlPosition.value + "%";
});

templateTextControlInp.addEventListener("keyup", () => {
	textJumbotronContent.innerText = templateTextControlInp.value;
});

templateType.addEventListener("change", ()=> {
	console.log(templateType.value);
});
submitBtn.addEventListener("click", async () => {
	const content = templateContainer.innerHTML.replace(/[\t]/g, "");
	const url = window.location.origin + "/create";
	const response = await fetch(url, {
		body: JSON.stringify({content}),
		method: "post",
		headers: new Headers({"Content-Type": "application/json"}),
	});
	const json = await response.json();
	console.log(json);
});
