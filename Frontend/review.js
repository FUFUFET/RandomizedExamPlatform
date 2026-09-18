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

if (unanswered.length > 0) {
  alert("Please answer all questions before reviewing.");
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

    const userP = document.createElement("p");
    userP.textContent = `Your answer: ${userAnswer}`;
    wrapper.appendChild(userP);

    const correctP = document.createElement("p");
    correctP.textContent = `Correct answer: ${correctAnswer}`;
    wrapper.appendChild(correctP);

    // Mark correctness
    const resultP = document.createElement("p");

    if (userAnswer === correctAnswer) {
      resultP.textContent = "✔ Correct";
      resultP.style.color = "green";
    } else {
      resultP.textContent = "✘ Incorrect";
      resultP.style.color = "red";
    }

    wrapper.appendChild(resultP);

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
