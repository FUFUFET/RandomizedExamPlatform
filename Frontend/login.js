// const users = [
//   { email: "test@test.com", password: "1234" },
//   { email: "ken@example.com", password: "5678" },
//   { email: "student@school.com", password: "0000" },
//   { email: "guest@demo.com", password: "9999" },
// ];

// const form = document.querySelector("form");
// const email = form.elements.email;
// const password = form.elements.password;
// const eError = document.getElementById("e-error");
// const pError = document.getElementById("p-error");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   validateForm();
// });

// email.addEventListener("input", () => {
//   if (email.value.includes("@")) {
//     email.removeAttribute("aria-invalid");
//     eError.textContent = "";
//   }
// });

// password.addEventListener("input", () => {
//   const pwd = password.value.trim();

//   if (pwd.length === 4 && /^\d+$/.test(pwd)) {
//     password.removeAttribute("aria-invalid");
//     pError.textContent = "";
//   }
// });

// function validateForm() {
//   const invalid = [];

//   // Reset
//   email.removeAttribute("aria-invalid");
//   password.removeAttribute("aria-invalid");
//   eError.style.color = "#b50f04";
//   pError.style.color = "#b50f04";
//   let hasError = false;

//   // Email validation

//   if (!email.value.trim()) {
//     email.setAttribute("aria-invalid", "true");
//     eError.textContent = "Email address is required.";
//     hasError = true;
//     invalid.push(email);
//   } else if (!email.value.match(/@/)) {
//     email.setAttribute("aria-invalid", "true");
//     eError.textContent = "Please enter a valid email address.";

//     hasError = true;
//     invalid.push(email);
//   }

//   //   email.addEventListener("input", () => {
//   //     if (email.value.includes("@")) {
//   //       email.removeAttribute("aria-invalid");
//   //       eError.textContent = "";
//   //     }
//   //   });

//   // Password validation
//   //   if (!password.value.trim() || password.value.trim().length < 4 || ) {
//   //     password.setAttribute("aria-invalid", "true");
//   //     pError.textContent = "Plese enter a 4-digit number.";

//   //     hasError = true;
//   //     invalid.push(password);
//   //   }

//   const pwd = password.value.trim();

//   if (!pwd || pwd.length < 4 || !/^\d+$/.test(pwd)) {
//     password.setAttribute("aria-invalid", "true");
//     pError.textContent = "Please enter a 4-digit number.";
//     hasError = true;
//     invalid.push(password);
//   }

//   //   password.addEventListener("input", () => {
//   //     const pwd = password.value.trim();

//   //     if (pwd.length === 4 && /^\d+$/.test(pwd)) {
//   //       password.removeAttribute("aria-invalid");
//   //       pError.textContent = "";
//   //     }
//   //   });

//   //   password.addEventListener("input", () => {
//   //     const pwd = password.value.trim();

//   //     if (pwd.length === 4 && /^\d+$/.test(pwd)) {
//   //       password.removeAttribute("aria-invalid");
//   //       pError.textContent = "";
//   //     }
//   //   });

//   //   if (!password.value.trim()) {
//   //     password.setAttribute("aria-invalid", "true");
//   //     pError.textContent = "Plese enter a 4-digit number.";

//   //     hasError = true;
//   //     invalid.push(password);
//   //   }
//   if (invalid.length > 0) {
//     invalid[0].focus();
//     return;
//   }
//   // if (!hasError) {
//   //   authenticate();
//   // }

//   // USER VALIDATION
//   const userExists = users.some(
//     (u) => u.email === email && u.password === password,
//   );

//   if (!userExists) {
//     loginError.textContent = "The user does not exist.";
//     loginError.focus();
//     return;
//   }

//   // SUCCESS → authenticate
//   authenticate();
// }
// function authenticate() {
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();

//   // Find matching user
//   const match = users.find(
//     (u) => u.email === emailValue && u.password === passwordValue,
//   );

//   if (match) {
//     // Store token
//     localStorage.setItem("token", "fake-token");

//     // Store user info (optional but useful)
//     localStorage.setItem("user", JSON.stringify(match));

//     // Redirect
//     window.location.href = "exam.html";
//   } else {
//     pError.textContent = "Incorrect email or password.";
//     password.setAttribute("aria-invalid", "true");
//   }
// }

const users = [
  { email: "test@test.com", password: "1234" },
  { email: "ken@example.com", password: "5678" },
  { email: "student@school.com", password: "0000" },
  { email: "guest@demo.com", password: "9999" },
];

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

  const match = users.find(
    (u) => u.email === emailValue && u.password === passwordValue,
  );

  if (match) {
    localStorage.setItem("token", "fake-token");

    localStorage.setItem("user", JSON.stringify(match));

    window.location.href = "exam.html";
  } else {
    loginE.textContent = "Incorrect email or password.";

    loginE.style.color = "#b50f04";

    loginE.focus();
  }
}
