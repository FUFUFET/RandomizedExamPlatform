const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ------------------------------
// GLOBAL STate
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
    const returnToQuestion = localStorage.getItem("returnToQuestion");
    const savedQuestions = localStorage.getItem("examQuestions");
    if (returnToQuestion !== null && savedQuestions) {
      questions = JSON.parse(savedQuestions);
      currentIndex = Number(returnToQuestion);
      localStorage.removeItem("returnToQuestion");
    } else {
      const res = await fetch("http://localhost:3000/exam/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      questions = data.questions;
      localStorage.setItem("examQuestions", JSON.stringify(questions));
    }
    renderQuestion();
    renderNav();
  } catch (err) {
    console.error("Failed to load exam:", err);
  }
}

// async function loadExam() {
//   try {
//     const res = await fetch("http://localhost:3000/exam/start", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     questions = data.questions;

//     // Save questions for review page
//     localStorage.setItem("examQuestions", JSON.stringify(questions));

//     renderQuestion();
//     renderNav();
//   } catch (err) {
//     console.error("Failed to load exam:", err);
//   }
// }

// async function loadExam() {
//   try {
//     const savedQuestions = localStorage.getItem("examQuestions");

//     if (savedQuestions) {
//       questions = JSON.parse(savedQuestions);
//     } else {
//       const res = await fetch("http://localhost:3000/exam/start", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",

//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       questions = data.questions;

//       localStorage.setItem("examQuestions", JSON.stringify(questions));
//     }

//     const returnToQuestion = localStorage.getItem("returnToQuestion");

//     if (returnToQuestion !== null) {
//       currentIndex = Number(returnToQuestion);

//       localStorage.removeItem("returnToQuestion");
//     }

//     renderQuestion();

//     renderNav();
//   } catch (err) {
//     console.error("Failed to load exam:", err);
//   }
// }

// ------------------------------
// RENDER QUESTION
// ------------------------------
// function renderQuestion() {
//   container.innerHTML = "";

//   const question = questions[currentIndex];

//   const options = question.options;

//   const groupName = `q${question.id}`;

//   const heading = document.createElement("h1");

//   heading.textContent = "Question " + (currentIndex + 1);

//   heading.setAttribute("tabindex", "-1");

//   container.appendChild(heading);

//   const fieldset = document.createElement("fieldset");

//   const legend = document.createElement("legend");

//   legend.textContent = question.question;

//   fieldset.appendChild(legend);

//   for (let i = 0; i < options.length; i++) {
//     const optionText = options[i];

//     const label = document.createElement("label");

//     const radioButton = document.createElement("input");

//     radioButton.type = "radio";

//     radioButton.name = groupName;

//     radioButton.value = optionText;

//     if (answers[question.id] === optionText) {
//       radioButton.checked = true;
//     }

//     radioButton.addEventListener("change", () => {
//       saveAnswer(question.id, optionText);
//     });

//     label.appendChild(radioButton);

//     label.appendChild(document.createTextNode(optionText));

//     fieldset.appendChild(label);
//   }

//   container.appendChild(fieldset);

//   heading.focus();
// }

function renderQuestion(shouldFocusHeading = false) {
  container.innerHTML = "";

  const question = questions[currentIndex];

  const options = question.options;

  const groupName = `q${question.id}`;

  const heading = document.createElement("h1");

  // heading.textContent = "Question " + (currentIndex + 1);
  // heading is also a progress indicator
  heading.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  heading.setAttribute("tabindex", "-1");

  container.appendChild(heading);

  const fieldset = document.createElement("fieldset");

  const legend = document.createElement("legend");

  legend.textContent = question.question;

  fieldset.appendChild(legend);

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

  if (shouldFocusHeading) {
    heading.focus();
  }
}
// ------------------------------
// RENDER NAV
// ------------------------------
// function renderNav() {
//   const nav = document.getElementById("nav-container");
//   nav.innerHTML = "";

//   const buttons = [];

//   if (currentIndex > 0) {
//     buttons.push({
//       text: "Previous",
//       onClick: () => {
//         currentIndex--;
//         renderQuestion(true);
//         renderNav();
//       },
//     });
//   }

//   if (currentIndex < questions.length - 1) {
//     buttons.push({
//       text: "Next",
//       onClick: () => {
//         currentIndex++;
//         renderQuestion(true);
//         renderNav();
//       },
//     });
//   }

//   if (currentIndex === questions.length - 1) {
//     // buttons.push({
//     //   text: "Review",
//     //   onClick: () => {
//     //     window.location.href = "review.html";
//     //   },
//     // });

//     buttons.push({
//       text: "Submit",
//       onClick: () => {
//         submitExam();
//       },
//     });
//   }

//   for (let i = 0; i < buttons.length; i++) {
//     const btn = buttons[i];

//     const buttonEl = document.createElement("button");

//     buttonEl.type = "button";

//     buttonEl.textContent = btn.text;

//     buttonEl.addEventListener("click", btn.onClick);

//     nav.appendChild(buttonEl);
//   }
// }

function renderNav() {
  const nav = document.getElementById("nav-container");

  nav.innerHTML = "";

  const buttons = [];

  if (currentIndex > 0) {
    buttons.push({
      text: "Previous",
      onClick: () => {
        currentIndex--;
        renderQuestion(true);
        renderNav();
      },
    });
  }

  if (currentIndex < questions.length - 1) {
    buttons.push({
      text: "Next",
      onClick: () => {
        currentIndex++;
        renderQuestion(true);
        renderNav();
      },
    });
  }

  if (currentIndex === questions.length - 1) {
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

    // Only disable Next and Submit when there is no answer
    if (btn.text !== "Previous" && !answers[questions[currentIndex].id]) {
      buttonEl.disabled = true;
    }

    buttonEl.addEventListener("click", btn.onClick);

    nav.appendChild(buttonEl);
  }
}
// ------------------------------
// SAVE ANSWER
// ------------------------------
// function saveAnswer(questionId, value) {
//   answers[questionId] = value;
//   localStorage.setItem("examAnswers", JSON.stringify(answers));
// }

function saveAnswer(questionId, value) {
  answers[questionId] = value;

  localStorage.setItem("examAnswers", JSON.stringify(answers));

  renderNav();
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
