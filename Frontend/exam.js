const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ------------------------------
// GLOBAL STATE
// ------------------------------
let questions = [];
let currentIndex = 0;
let answers = JSON.parse(localStorage.getItem("examAnswers")) || {};
const container = document.getElementById("question-container");

// ------------------------------
// FETCH QUESTIONS
// ------------------------------
async function loadExam() {
  try {
    const res = await fetch("http://localhost:3000/exam/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    questions = data.questions;

    // Save questions for review page
    localStorage.setItem("examQuestions", JSON.stringify(questions));

    renderQuestion();
    renderNav();
  } catch (err) {
    console.error("Failed to load exam:", err);
  }
}

// ------------------------------
// RENDER QUESTION
// ------------------------------
function renderQuestion() {
  container.innerHTML = "";

  const question = questions[currentIndex];
  const options = question.options;
  const groupName = `q${question.id}`;

  // const heading = document.createElement("h1");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");

  legend.textContent = question.question;
  fieldset.appendChild(legend);

  // options.forEach((optionText) => {
  //   const label = document.createElement("label");
  //   const radioButton = document.createElement("input");

  //   radioButton.type = "radio";
  //   radioButton.name = groupName;
  //   radioButton.value = optionText;

  //   if (answers[question.id] === optionText) {
  //     radioButton.checked = true;
  //   }

  //   radioButton.addEventListener("change", () => {
  //     saveAnswer(question.id, optionText);
  //   });

  //   label.appendChild(radioButton);
  //   label.appendChild(document.createTextNode(optionText));
  //   fieldset.appendChild(label);
  // });

  for (let i = 0; i < options.length; i++) {
    const optionText = options[i];

    const label = document.createElement("label");

    const radioButton = document.createElement("input");

    radioButton.type = "radio";

    radioButton.name = groupName;

    radioButton.value = optionText;

    if (answers[question.id] === optionText) {
      radioButton.checked = true;
    }

    radioButton.addEventListener("change", () => {
      saveAnswer(question.id, optionText);
    });

    label.appendChild(radioButton);

    label.appendChild(document.createTextNode(optionText));

    fieldset.appendChild(label);
  }

  container.appendChild(fieldset);
}

// ------------------------------
// RENDER NAV
// ------------------------------
function renderNav() {
  const nav = document.getElementById("nav-container");
  nav.innerHTML = "";

  const buttons = [];

  if (currentIndex > 0) {
    buttons.push({
      text: "Previous",
      onClick: () => {
        currentIndex--;
        renderQuestion();
        renderNav();
      },
    });
  }

  if (currentIndex < questions.length - 1) {
    buttons.push({
      text: "Next",
      onClick: () => {
        currentIndex++;
        renderQuestion();
        renderNav();
      },
    });
  }

  if (currentIndex === questions.length - 1) {
    // buttons.push({
    //   text: "Review",
    //   onClick: () => {
    //     window.location.href = "review.html";
    //   },
    // });

    buttons.push({
      text: "Submit",
      onClick: () => {
        submitExam();
      },
    });
  }

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];

    const buttonEl = document.createElement("button");

    buttonEl.type = "button";

    buttonEl.textContent = btn.text;

    buttonEl.addEventListener("click", btn.onClick);

    nav.appendChild(buttonEl);
  }
}

// ------------------------------
// SAVE ANSWER
// ------------------------------
function saveAnswer(questionId, value) {
  answers[questionId] = value;
  localStorage.setItem("examAnswers", JSON.stringify(answers));
}

// ------------------------------
// SUBMIT EXAM
// ------------------------------
async function submitExam() {
  try {
    const res = await fetch("http://localhost:3000/exam/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers,
      }),
    });

    const result = await res.json();

    if (result.error) {
      alert(result.error);
      return;
    }

    localStorage.setItem("examResult", JSON.stringify(result));
    window.location.href = "review.html";
  } catch (err) {
    console.error("Failed to submit exam:", err);
  }
}

// ------------------------------
// INIT
// ------------------------------
loadExam();

// const token = localStorage.getItem("token");

// if (!token) {
//   window.location.href = "login.html";
// }

// const examContainer = document.getElementById("exam-container");
// const nextButton = document.getElementById("next4");

// let questions = [];

// fetch("questions.json")
//   .then((response) => response.json())
//   .then((data) => {
//     questions = data;

//     // Randomize the questions
//     for (let i = questions.length - 1; i > 0; i--) {
//       const randomIndex = Math.floor(Math.random() * (i + 1));

//       const temp = questions[i];
//       questions[i] = questions[randomIndex];
//       questions[randomIndex] = temp;
//     }

//     // Create the questions
//     for (let i = 0; i < questions.length; i++) {
//       const question = questions[i];

//       const fieldset = document.createElement("fieldset");

//       const legend = document.createElement("legend");
//       legend.textContent = question.question;

//       fieldset.appendChild(legend);

//       for (let j = 0; j < question.options.length; j++) {
//         const option = question.options[j];

//         const label = document.createElement("label");

//         const radio = document.createElement("input");
//         radio.type = "radio";
//         radio.name = "question" + question.id;
//         radio.value = option;

//         label.appendChild(radio);
//         label.appendChild(document.createTextNode(" " + option));

//         fieldset.appendChild(label);
//         fieldset.appendChild(document.createElement("br"));
//       }

//       examContainer.appendChild(fieldset);
//     }
//   })
//   .catch((error) => {
//     console.error("Error loading questions:", error);
//   });

// // Save answers and go to review
// nextButton.addEventListener("click", () => {
//   const examAnswers = {};

//   for (let i = 0; i < questions.length; i++) {
//     const question = questions[i];

//     const selectedAnswer = document.querySelector(
//       `input[name="question${question.id}"]:checked`,
//     );

//     if (selectedAnswer) {
//       examAnswers["q" + question.id] = selectedAnswer.value;
//     } else {
//       examAnswers["q" + question.id] = null;
//     }
//   }

//   localStorage.setItem("examAnswers", JSON.stringify(examAnswers));
// });

// loadExam();
