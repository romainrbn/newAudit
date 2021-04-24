//Variables globales
//Variables d'interface
const quiz = document.getElementById("quiz");
const addSection = document.getElementById("addSection");
const addNewSection = document.getElementById("addNewSection");
const sectionConfig = document.getElementById("sectionConfig");
const form = document.getElementById("quizForm");
const submit = document.getElementById("submit");
const submitAnswer = document.getElementById("submitAnswer");
const addQuestionToSection = document.getElementById("addQuestionToSection");
const firstSectionName = document.getElementById("firstSectionName");
const addFirstSectionButton = document.getElementById("addFirstSectionButton");

// Positions
let pos = 1;
let quizPos = 1;
let position = 0;
let incorrectPos = 0;
let currentSection = 0;

const sections = [];
const questions = [];


// Ajout de la première section
addSection.addEventListener("click", (e) => {
	// Si le nom de la section n'est pas nul
	addSectionToList(currentSection, "nomSection");
	clearConfig();
	renderForm();
	
})

addQuestionToSection.addEventListener("click", (e) => {
	addNewQuestion(currentSection, 0);
})

addNewSection.addEventListener("click", (e) => {
	addNewSectionAction();
})

function addNewSectionAction() {
	/* if (questions[currentSection] && questions[currentSection].length) { */
	const nextSection = currentSection+1;
	addNewSection.classList.add("hide");
	
	var newSectionLabel = document.createElement("h3");
	newSectionLabel.innerHTML = "Nouvelle section";

	var newElement = document.createElement("form");
	newElement.setAttribute('class', 'col s12');
	
	var innerDiv = document.createElement("div");
	innerDiv.setAttribute('class', 'row');
	innerDiv.setAttribute('style', 'padding-top: 30px');
	
	var inputDiv = document.createElement("div");
	inputDiv.setAttribute('class', 'input-field col m6 s12');
	
	var input = document.createElement("input");
	input.setAttribute("placeholder", "Nom de la section");
	input.setAttribute("id", "nomSection"+nextSection.toString());
	input.setAttribute("type", "text");
	input.setAttribute("class", "validate");
	
	var label = document.createElement("label");
	label.setAttribute("for", "questions");
	label.setInnerHTML = "Créez la section";
	
	var addButton = document.createElement("a");
	addButton.setAttribute("id", "addNewSectionConfirm");
	addButton.setAttribute("class", "waves-effect waves-light btn-small blue");
	addButton.setAttribute("style", "margin-right: 25px");
	addButton.innerHTML = "Ajouter";
	
	// Ajout de la nouvelle section
	addButton.addEventListener("click", (e) => {
		const nextSection = currentSection+1;
		addSectionToList(currentSection+1, "nomSection"+(currentSection+1).toString())
		var sectionTitle = document.getElementById("nomSection" + nextSection.toString()).value;
		console.log("Section title:" + sectionTitle);
		currentSection++;
		addNewSectionToInterface(currentSection);
		
		// Masquer les éléments 
		label.classList.add("hide");
		addButton.classList.add("hide");
		input.classList.add("hide");
		inputDiv.classList.add("hide");
		newElement.classList.add("hide");
		newSectionLabel.classList.add("hide");
	//	addNewSection.classList.remove("hide");
	
		var newSectionButton = document.createElement("a");
		newSectionButton.setAttribute("id", "addNewSection");
		newSectionButton.setAttribute("class", "waves-effect waves-light btn-small blue");
		newSectionButton.setAttribute("style", "margin-right: 25px");
		newSectionButton.innerHTML = "Nouvelle section";
		newSectionButton.addEventListener("click", (e) => {
			newSectionButton.classList.add("hide");
			addNewSectionAction();
		})
		var space = document.createElement("br");
		
		document.getElementById("formContainer").appendChild(space);
		document.getElementById("formContainer").appendChild(space);
		document.getElementById("formContainer").appendChild(space);
		document.getElementById("formContainer").appendChild(newSectionButton);
		

	})
	
	var cancelButton = document.createElement("a");
	cancelButton.setAttribute("id", "cancelNewSection");
	cancelButton.setAttribute("class", "waves-effect waves-light btn-small grey lighten-1");
	cancelButton.innerHTML = "Annuler";
	// Annulation de l'ajout de section
	cancelButton.addEventListener("click", (e) => {
		// Réaffichage du bouton d'ajout de section
		addNewSection.classList.remove("hide")
		
		// Masquage de l'input et des deux boutons
		newElement.classList.add("hide");
	})
	
	newElement.appendChild(innerDiv);
	innerDiv.appendChild(inputDiv);
	inputDiv.appendChild(input);
	inputDiv.appendChild(addButton);
	inputDiv.appendChild(cancelButton);
	inputDiv.appendChild(label);
	document.getElementById("formContainer").appendChild(newSectionLabel);
	document.getElementById("formContainer").appendChild(newElement);
/* } else {
	alert("Vous devez avoir au moins une question dans la section précédente pour en rajouter une autre.")
} */
}

function addSectionToList(index, id) {
	var inputVal = document.getElementById(id).value;
	if (inputVal) {
		const section = {
				intitule: inputVal,
				id: index
		}
		// Ajout de la section au tableau des sections.
		sections.push(section);
	} else {
		alert("Le nom de la section ne doit pas être nul.")
	}
	console.log(sections);
}

function clearConfig() {
	firstSectionName.innerHTML = " ";
	addFirstSectionButton.innerHTML = " ";
}

function addNewQuestion(currentSection, newSection) {
	var questionsList = document.getElementById("questionsList"+newSection.toString());
	questionsList.classList.remove("hide");
	
	var innerTest = document.createElement("p");
	innerTest.appendChild(document.createTextNode("This is a question."))
	questionsList.appendChild(innerTest);
}

function renderForm() {
	const renderForm = document.getElementById("formContainer");
	formContainer.classList.remove("hide");
	const sectionName = document.getElementById("sectionNameLabel");
	sectionName.innerHTML = 'Section : ' + sections[currentSection].intitule;
}

function addNewSectionToInterface(currentSection) {
	console.log("new section triggered");
	var newElement = document.createElement("div");
	newElement.setAttribute("id", "section"+currentSection.toString());
	
	var sectionTitle = document.createElement("h2");
	sectionTitle.setAttribute("id", "sectionNameLabel"+currentSection.toString());
	sectionTitle.innerHTML = 'Section : ' + sections[currentSection].intitule;
	
	var questionsList = document.createElement("div");
	questionsList.setAttribute("id", "questionsList"+currentSection.toString());
	questionsList.setAttribute("class", "row hide");
	
	var addQuestionButton = document.createElement("a");
	addQuestionButton.setAttribute("id", "addQuestionToSection");
	addQuestionButton.setAttribute("class", "waves-effect waves-light btn-small blue");
	addQuestionButton.setAttribute("style", "margin-right: 25px");
	addQuestionButton.innerHTML = "Ajouter une question";
	
	addQuestionButton.addEventListener("click", (e) => {
		addNewQuestion(currentSection, currentSection);
	})
	
	newElement.appendChild(sectionTitle);
	newElement.appendChild(questionsList);
	newElement.appendChild(addQuestionButton);
	
	document.getElementById("formContainer").appendChild(newElement);
}
