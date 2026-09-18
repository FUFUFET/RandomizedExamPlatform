// ------------------------------
// AUTH CHECK
// ------------------------------

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ------------------------------
// LOAD SAVED STATE
// ------------------------------

const questions = JSON.parse(localStorage.getItem("examQuestions")) || [];
const answers = JSON.parse(localStorage.getItem("examAnswers")) || {};
const reviewContainer = document.getElementById("review-container");
const reviewNav = document.getElementById("review-nav");

// ------------------------------
// BLOCK REVIEW IF UNANSWERED
// ------------------------------

const unanswered = questions.filter((q) => {
  const answer = answers[q.id];

  return answer === undefined || answer === null || answer === "";
});

// if (unanswered.length > 0) {
//   alert("Please answer all questions before reviewing.");
//   window.location.href = "exam.html";
// }

if (unanswered.length > 0) {
  alert("Please answer all questions before reviewing.");

  localStorage.setItem("returnToQuestion", "3");
  //  localStorage.setItem("returnToQuestion", "4");

  window.location.href = "exam.html";
}

// ------------------------------
// RENDER REVIEW CONTENT
// ------------------------------

function renderReview() {
  reviewContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div");
    const questionText = document.createElement("h2");

    questionText.textContent = `Question ${index + 1}: ${q.question}`;
    wrapper.appendChild(questionText);

    const userAnswer = answers[q.id];

    // q.answer is the index of the correct option
    // q.options[q.answer] gets the actual answer text
    const correctAnswer = q.options[q.answer];

    // const userP = document.createElement("p");
    // userP.textContent = `Your answer: ${userAnswer}`;
    // wrapper.appendChild(userP);

    // const correctP = document.createElement("p");
    // correctP.textContent = `Correct answer: ${correctAnswer}`;
    // wrapper.appendChild(correctP);

    const dl = document.createElement("dl");

    const userDT = document.createElement("dt");
    userDT.textContent = "Your answer:";

    dl.appendChild(userDT);

    const userDD = document.createElement("dd");
    userDD.textContent = userAnswer;

    dl.appendChild(userDD);

    const correctDT = document.createElement("dt");
    correctDT.textContent = "Correct answer:";

    dl.appendChild(correctDT);

    const correctDD = document.createElement("dd");
    correctDD.textContent = correctAnswer;

    dl.appendChild(correctDD);

    wrapper.appendChild(dl);
    // Mark correctness
    const resultP = document.createElement("p");

    if (userAnswer === correctAnswer) {
      resultP.textContent = "✔ Correct";
      resultP.style.color = "rgb(30, 79, 4)";
    } else {
      resultP.textContent = "✘ Incorrect";
      resultP.style.color = "#980000";
    }

    wrapper.appendChild(resultP);
    questionText.after(resultP);
    reviewContainer.appendChild(wrapper);
  });
}

// ------------------------------
// RENDER NAV BUTTONS
// ------------------------------

function renderNav() {
  reviewNav.innerHTML = "";

  const returnBtn = document.createElement("button");

  returnBtn.textContent = "Return to Exam";

  returnBtn.addEventListener("click", () => {
    window.location.href = "exam.html";
  });

  const doneBtn = document.createElement("button");

  doneBtn.textContent = "Finish";

  doneBtn.addEventListener("click", () => {
    window.location.href = "done.html";
  });

  reviewNav.appendChild(returnBtn);
  reviewNav.appendChild(doneBtn);
}

// ------------------------------
// INIT
// ------------------------------

renderReview();
renderNav();
