// const token = localStorage.getItem("token");
// if (!token) {
//   window.location.href = "index.html";
// }
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const CBContainter = document.getElementsByClassName("CB-Cont");

// Selects all <h1> elements that are direct children of a <div>
const headings = document.querySelectorAll("div > h1");

// Loop through the headings and assign IDs to their parent <div> elements
for (let i = 0; i < headings.length && i < 4; i++) {
  const parentDiv = headings[i].parentElement;
  parentDiv.id = "question-" + (i + 1);
  headings[i].textContent = `Question ${i + 1}`;
  headings[i].setAttribute("tabindex", "-1");
}

const question1 = document.getElementById("question-1");
const question2 = document.getElementById("question-2");
const question3 = document.getElementById("question-3");
const question4 = document.getElementById("question-4");
question2.classList.add("hidden");
question3.classList.add("hidden");
question4.classList.add("hidden");

const button1 = document.getElementById("next1");

button1.addEventListener("click", () => {
  question1.classList.add("hidden");
  question2.classList.remove("hidden");
  headings[1].focus();
});

const prev2 = document.getElementById("prev2");
prev2.addEventListener("click", () => {
  question2.classList.add("hidden");
  question1.classList.remove("hidden");
  headings[0].focus();
});

const next2 = document.getElementById("next2");
next2.addEventListener("click", () => {
  question2.classList.add("hidden");
  question3.classList.remove("hidden");
  headings[2].focus();
});

const prev3 = document.getElementById("prev3");
prev3.addEventListener("click", () => {
  question3.classList.add("hidden");
  question2.classList.remove("hidden");
  headings[1].focus();
});

const next3 = document.getElementById("next3");
next3.addEventListener("click", () => {
  question3.classList.add("hidden");
  question4.classList.remove("hidden");
  headings[3].focus();
});

const prev4 = document.getElementById("prev4");
prev4.addEventListener("click", () => {
  question4.classList.add("hidden");
  question3.classList.remove("hidden");
  headings[2].focus();
});
