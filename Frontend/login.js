const form = document.querySelector("form");

const email = form.elements.email;

const password = form.elements.password;

const eError = document.getElementById("e-error");

const pError = document.getElementById("p-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateForm();
});

email.addEventListener("input", () => {
  if (email.value.trim() && email.validity.typeMismatch === false) {
    email.removeAttribute("aria-invalid");

    eError.textContent = "";
  }
});

password.addEventListener("input", () => {
  const pwd = password.value.trim();

  if (pwd.length === 4 && /^\d+$/.test(pwd)) {
    password.removeAttribute("aria-invalid");

    pError.textContent = "";
  }
});

function validateForm() {
  const invalid = [];

  // Reset

  email.removeAttribute("aria-invalid");

  password.removeAttribute("aria-invalid");

  eError.textContent = "";

  pError.textContent = "";

  eError.style.color = "#b50f04";

  pError.style.color = "#b50f04";

  // Email validation

  if (!email.value.trim()) {
    eError.textContent = "Email address is required.";

    email.setAttribute("aria-invalid", "true");

    invalid.push(email);
  } else if (email.validity.typeMismatch) {
    eError.textContent = "Please enter a valid email address.";

    email.setAttribute("aria-invalid", "true");

    invalid.push(email);
  }

  // Password validation

  const pwd = password.value.trim();

  if (!pwd || pwd.length !== 4 || !/^\d+$/.test(pwd)) {
    password.setAttribute("aria-invalid", "true");

    pError.textContent = "Please enter a 4-digit number.";

    invalid.push(password);
  }

  // Focus first invalid field

  if (invalid.length > 0) {
    invalid[0].focus();

    return;
  }

  // No validation errors → authenticate

  authenticate();
}

function authenticate() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const loginE = document.getElementById("login-error");

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        loginE.textContent = data.error;
        loginE.style.color = "#b50f04";
        loginE.focus();
        return;
      }

      // Successful login → store token and redirect
      localStorage.setItem("token", data.token);
      window.location.href = "exam.html";
    })
    .catch(() => {
      loginE.textContent = "Server error. Please try again.";
      loginE.style.color = "#b50f04";
      loginE.focus();
    });
}

window.addEventListener("pageshow", () => {
  localStorage.removeItem("examAnswers");
});
