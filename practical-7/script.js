// Helper: print a line to a <pre> block and to the browser console
function print(id, text) {
  document.getElementById(id).textContent += text + "\n";
  console.log(text);
}

/* ================= 1. VARIABLES & DATA TYPES ================= */
const college = "JG University";      // string  (cannot be reassigned)
let semester = 3;                      // number  (can be reassigned)
var isEnrolled = true;                 // boolean (function-scoped, older style)
let mentor = null;                     // null
let project;                           // undefined
const marks = [78, 85, 92];            // array (object)
const student = { name: "Aarav", roll: 21 }; // object

semester = semester + 1;               // let allows reassignment

print("out-vars", `college    = ${college}  (${typeof college})`);
print("out-vars", `semester   = ${semester}  (${typeof semester})`);
print("out-vars", `isEnrolled = ${isEnrolled}  (${typeof isEnrolled})`);
print("out-vars", `mentor     = ${mentor}  (${typeof mentor})`);
print("out-vars", `project    = ${project}  (${typeof project})`);
print("out-vars", `marks      = [${marks}]  (Array? ${Array.isArray(marks)})`);
print("out-vars", `student    = ${JSON.stringify(student)}  (${typeof student})`);

/* ================= 2. OPERATORS ================= */
const a = 17, b = 5;

print("out-ops", `Arithmetic: ${a} + ${b} = ${a + b}, ${a} - ${b} = ${a - b}`);
print("out-ops", `            ${a} * ${b} = ${a * b}, ${a} / ${b} = ${(a / b).toFixed(2)}`);
print("out-ops", `            ${a} % ${b} = ${a % b}, ${b} ** 2 = ${b ** 2}`);

let x = 10;
x += 5;
x *= 2;

print("out-ops", `Assignment: x = 10; x += 5; x *= 2  ->  x = ${x}`);

print("out-ops", `Comparison: 5 == "5" -> ${5 == "5"},  5 === "5" -> ${5 === "5"}`);
print("out-ops", `            ${a} > ${b} -> ${a > b},  ${a} !== ${b} -> ${a !== b}`);

const hasId = true, hasFee = false;

print("out-ops", `Logical:    true && false -> ${hasId && hasFee}, true || false -> ${hasId || hasFee}, !true -> ${!hasId}`);
print("out-ops", `Ternary:    ${a} is ${a % 2 === 0 ? "even" : "odd"}`);

/* ================= 3. CONDITIONS ================= */
function getGrade(score) {
  if (score >= 90) return "O (Outstanding)";
  else if (score >= 80) return "A+ (Excellent)";
  else if (score >= 70) return "A (Very Good)";
  else if (score >= 60) return "B+ (Good)";
  else if (score >= 40) return "P (Pass)";
  else return "F (Fail)";
}

[95, 83, 71, 55, 32].forEach(s =>
  print("out-cond", `Score ${s} -> Grade ${getGrade(s)}`)
);

const dayNumber = 3;
let dayName;

switch (dayNumber) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  default:
    dayName = "Weekend";
}

print("out-cond", `switch(${dayNumber}) -> ${dayName} is a lab day`);

/* ================= 4. LOOPS ================= */

// for loop: multiplication table
let row = "";

for (let i = 1; i <= 5; i++) {
  row += `7x${i}=${7 * i}  `;
}

print("out-loops", "for      : " + row);

// while loop: sum of digits
let num = 2026, sum = 0;

while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}

print("out-loops", `while    : sum of digits of 2026 = ${sum}`);

// do...while loop: runs at least once
let count = 1, evens = [];

do {
  if (count % 2 === 0) evens.push(count);
  count++;
} while (count <= 10);

print("out-loops", `do-while : even numbers 1-10 = ${evens.join(", ")}`);

// for...of loop over an array
let total = 0;

for (const m of marks) {
  total += m;
}

print("out-loops", `for...of : total of [${marks}] = ${total}, average = ${(total / marks.length).toFixed(1)}`);

// for...in loop over an object
for (const key in student) {
  print("out-loops", `for...in : student.${key} = ${student[key]}`);
}

// break and continue
let primes = [];

for (let n = 2; primes.length < 8; n++) {
  let isPrime = true;

  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      isPrime = false;
      break;
    }
  }

  if (!isPrime) continue;

  primes.push(n);
}

print("out-loops", `nested   : first 8 primes = ${primes.join(", ")}`);