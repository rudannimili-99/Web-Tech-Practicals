// ===== 1. Array of objects: the data store =====
let students = [
  { id: 1, name: "Aarav Mehta", branch: "CE", marks: 88 },
  { id: 2, name: "Diya Patel", branch: "IT", marks: 34 },
  { id: 3, name: "Kabir Shah", branch: "AIDS", marks: 72 },
  { id: 4, name: "Meera Iyer", branch: "CE", marks: 95 }
];

let nextId = 5;
let viewList = [...students]; // copy used for sorting / filtering

// ===== 2. Selecting DOM elements =====
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const statsBox = document.querySelector("#stats");

// ===== 3. Functions =====

// Function declaration
function getResult(marks) {
  return marks >= 40 ? "Pass" : "Fail";
}

// Arrow function with default parameter
const average = (list = []) =>
  list.length
    ? (list.reduce((sum, s) => sum + s.marks, 0) / list.length).toFixed(1)
    : 0;

// Function that builds a DOM row from an object
function createRow(student, index) {
  const tr = document.createElement("tr");
  tr.dataset.id = student.id;

  // Object destructuring
  const { name, branch, marks } = student;
  const result = getResult(marks);

  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${name}</td>
    <td>${branch}</td>
    <td>${marks}</td>
    <td class="${result.toLowerCase()}">${result}</td>
  `;

  const actionCell = document.createElement("td");
  const delBtn = document.createElement("button");

  delBtn.textContent = "Delete";
  delBtn.className = "delete";
  delBtn.addEventListener("click", () => deleteStudent(student.id));

  actionCell.appendChild(delBtn);
  tr.appendChild(actionCell);

  return tr;
}

// Render the table and statistics
function render(list = viewList, highlightId = null) {
  tableBody.innerHTML = ""; // clear old rows

  list.forEach((s, i) => {
    const row = createRow(s, i);

    if (s.id === highlightId) {
      row.classList.add("new-row");
    }

    tableBody.appendChild(row);
  });

  renderStats();
}

function renderStats() {
  const marksOnly = students.map(s => s.marks); // map
  const passed = students.filter(s => s.marks >= 40).length; // filter

  const topper = students.reduce(
    (best, s) => (s.marks > best.marks ? s : best),
    students[0]
  ); // reduce

  const cards = [
    { label: "Total Students", value: students.length },
    { label: "Class Average", value: average(students) },
    {
      label: "Highest Marks",
      value: marksOnly.length ? Math.max(...marksOnly) : 0
    },
    {
      label: "Pass Count",
      value: `${passed} / ${students.length}`
    }
  ];

  statsBox.innerHTML = cards
    .map(c => `<div class="stat"><strong>${c.value}</strong>${c.label}</div>`)
    .join("");

  if (topper) {
    statsBox.title = `Topper: ${topper.name}`;
  }
}

function addStudent(name, marks, branch) {
  const student = {
    id: nextId++,
    name,
    branch,
    marks
  }; // object shorthand

  students.push(student); // array push
  viewList = [...students];
  render(viewList, student.id);
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  viewList = viewList.filter(s => s.id !== id);
  render();
}

// ===== 4. Wiring buttons to functions =====

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const marks = Number(document.getElementById("marks").value);
  const branch = document.getElementById("branch").value;

  if (!name || marks < 0 || marks > 100) {
    return;
  }

  addStudent(name, marks, branch);
  form.reset();
});

document.getElementById("sortBtn").onclick = () => {
  viewList = [...viewList].sort((a, b) => b.marks - a.marks); // sort descending
  render();
};

document.getElementById("filterBtn").onclick = () => {
  viewList = students.filter(s => getResult(s.marks) === "Pass");
  render();
};

document.getElementById("resetBtn").onclick = () => {
  viewList = [...students];
  render();
};

document.getElementById("themeBtn").onclick = () =>
  document.body.classList.toggle("dark");

// Initial render
render();