// Protect the page
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

// Accessibilitgy: focus the heading
const heading = document.querySelector("h1");
heading.setAttribute("tabindex", "-1");

// Clear exam answers
localStorage.removeItem("examAnswers");

// Optional: end session completely
// localStorage.removeItem("token");
// localStorage.removeItem("user");

// Add navigation button
const main = document.querySelector("main");
const btn = document.createElement("button");
btn.textContent = "Return to login page";
btn.id = "return-home";

btn.addEventListener("click", () => {
  window.location.href = "login.html";
});

main.appendChild(btn);
