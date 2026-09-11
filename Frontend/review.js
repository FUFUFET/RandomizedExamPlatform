// localStorage.removeItem("token");
// localStorage.removeItem("user");
// window.location.href = "login.html";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const review = document.getElementById("review-message");

const params = new URLSearchParams(window.location.search);

const q1 = params.get("q1");
const q2 = params.get("q2");
const q3 = params.get("q3");
const q4 = params.get("q4");

const unanswered = [];

if (!q1) {
  unanswered.push("Question 1");
}

if (!q2) {
  unanswered.push("Question 2");
}

if (!q3) {
  unanswered.push("Question 3");
}

if (!q4) {
  unanswered.push("Question 4");
}

if (unanswered.length > 0) {
  review.textContent = `${unanswered} are not answered.`;
} else {
  review.textContent = `You answered all the questions. Please click on Done button.`;
}
