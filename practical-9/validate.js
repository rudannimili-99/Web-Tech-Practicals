// ===== Element references =====
const form     = document.getElementById("signupForm");
const fullname = document.getElementById("fullname");
const email    = document.getElementById("email");
const mobile   = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmP = document.getElementById("confirm");
const terms    = document.getElementById("terms");
const message  = document.getElementById("formMessage");
const logList  = document.getElementById("log");

// ===== Utility: write to the on-page event log =====
function logEvent(text) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()}  ${text}`;
  logList.prepend(li);
}

// ===== Show / clear error for one field =====
function setError(input, msg) {
  const field = input.closest(".field");
  field.classList.add("invalid");
  field.classList.remove("valid");
  field.querySelector(".error").textContent = msg;
  return false;
}

function setSuccess(input) {
  const field = input.closest(".field");
  field.classList.remove("invalid");
  field.classList.add("valid");
  field.querySelector(".error").textContent = "";
  return true;
}

// ===== Validation rules (regular expressions) =====
const patterns = {
  name:   /^[A-Za-z]+(?: [A-Za-z]+)+$/,
  email:  /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
  mobile: /^[6-9]\d{9}$/,
  strong: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

function validateName() {
  const v = fullname.value.trim();
  if (v === "") return setError(fullname, "Name is required.");
  if (!patterns.name.test(v)) return setError(fullname, "Enter first and last name (letters only).");
  return setSuccess(fullname);
}

function validateEmail() {
  const v = email.value.trim();
  if (v === "") return setError(email, "Email is required.");
  if (!patterns.email.test(v)) return setError(email, "Enter a valid email address.");
  return setSuccess(email);
}

function validateMobile() {
  const v = mobile.value.trim();
  if (!patterns.mobile.test(v)) return setError(mobile, "Enter a valid 10-digit mobile number starting with 6-9.");
  return setSuccess(mobile);
}

function validatePassword() {
  if (!patterns.strong.test(password.value))
    return setError(password, "Password must have 8+ characters, an uppercase letter and a digit.");
  return setSuccess(password);
}

function validateConfirm() {
  if (confirmP.value === "" || confirmP.value !== password.value)
    return setError(confirmP, "Passwords do not match.");
  return setSuccess(confirmP);
}

function validateTerms() {
  if (!terms.checked) return setError(terms, "You must accept the terms.");
  return setSuccess(terms);
}

// ===== Password strength meter (input event) =====
password.addEventListener("input", () => {
  const v = password.value;
  let score = 0;

  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const levels = [
    ["0%", "#e5e7eb", ""],
    ["25%", "#dc2626", "Weak"],
    ["50%", "#f59e0b", "Fair"],
    ["75%", "#3b82f6", "Good"],
    ["100%", "#16a34a", "Strong"]
  ];

  const [width, color, label] = levels[score];
  const bar = document.getElementById("strengthBar");

  bar.style.width = width;
  bar.style.background = color;

  document.getElementById("strengthText").textContent =
    label ? `Strength: ${label}` : "";
});

// ===== Real-time validation: blur and input events =====
const rules = [
  [fullname, validateName],
  [email, validateEmail],
  [mobile, validateMobile],
  [password, validatePassword],
  [confirmP, validateConfirm]
];

rules.forEach(([input, fn]) => {
  input.addEventListener("blur", () => {
    fn();
    logEvent(`blur  -> #${input.id}`);
  });

  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("invalid")) fn();
  });

  input.addEventListener("focus", () =>
    logEvent(`focus -> #${input.id}`)
  );
});

terms.addEventListener("change", () => {
  validateTerms();
  logEvent(`change -> terms = ${terms.checked}`);
});

// Allow only digits in the mobile field
mobile.addEventListener("keydown", (e) => {
  const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

  if (!/^\d$/.test(e.key) && !allowed.includes(e.key))
    e.preventDefault();
});

// Keyboard events
fullname.addEventListener("keyup", (e) => {
  document.getElementById("charCount").textContent = fullname.value.length;
  document.getElementById("lastKey").textContent = e.key;
});

// ===== Submit event: validate everything =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const results = [
    validateName(),
    validateEmail(),
    validateMobile(),
    validatePassword(),
    validateConfirm(),
    validateTerms()
  ];

  const errors = results.filter(ok => !ok).length;

  if (errors === 0) {
    message.className = "success";
    message.textContent =
      `Registration successful! Welcome, ${fullname.value.split(" ")[0]}.`;

    logEvent("submit -> form valid");
  } else {
    message.className = "fail";
    message.textContent =
      `Please fix ${errors} error${errors > 1 ? "s" : ""} before submitting.`;

    logEvent(`submit -> blocked (${errors} errors)`);
  }
});

// ===== Mouse events on the demo box =====
const box = document.getElementById("hoverBox");

box.addEventListener("mouseenter", () => {
  box.classList.add("active");
  logEvent("mouseenter -> box");
});

box.addEventListener("mouseleave", () => {
  box.classList.remove("active");
  logEvent("mouseleave -> box");
});

box.addEventListener("dblclick", () => {
  box.classList.toggle("clicked");
  logEvent("dblclick -> box");
});

// Page load event
window.addEventListener("load", () => {
  logEvent("load -> page ready");
});