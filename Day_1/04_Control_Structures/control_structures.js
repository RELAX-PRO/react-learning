/**
 * Block Comment: Control Structures and Declarative Mapping
 * Control structures direct the flow of execution in a program.
 * While traditional 'if/else' statements evaluate block logic (imperative), React heavily favors
 * expression-based structures like the Ternary operator (condition ? true : false) because 
 * JSX requires expressions inside its braces, not statements.
 * Similarly, mapping over arrays dynamically produces UI elements natively in React,
 * replacing the imperative 'for' loop.
 */

// 1. Traditional if/else (Cannot be used directly inside JSX return statements)
let userBadge;
let userScore = 100;
if (userScore >= 100) { // Evaluates boolean condition
  userBadge = "Gold VIP";
} else {
  userBadge = "Standard Member";
}
console.log(userBadge);

// 2. Ternary Operator (Commonly used in React JSX)
const modernBadge = userScore >= 100 ? "Gold VIP" : "Standard Member"; // Syntax: condition ? expressionIfTrue : expressionIfFalse
console.log(modernBadge);

// Example of ternary operator in React JSX:
// return (
//   <div>
//     {isLoggedIn ? <AdminDashboard /> : <LoginScreen />}
//   </div>
// );

// 1. Traditional switch statement
function getStatusMessage(status) {
  switch (status) {
    case "LOADING":
      return "Please wait, fetching data...";
    case "SUCCESS":
      return "Data loaded successfully!";
    case "ERROR":
      return "Something went wrong!";
    default:
      return "Unknown status";
  }
}

// 2. Object Mapping (Modern approach)
const statusMessages = {
  LOADING: "Please wait, fetching data...",
  SUCCESS: "Data loaded successfully!",
  ERROR: "Something went wrong!"
};

const currentStatus = "SUCCESS";
const displayMessage = statusMessages[currentStatus] || "Unknown status";
console.log(displayMessage); // Output: "Data loaded successfully!"

const developerSkills = ["JavaScript", "React", "Node.js"];

// 1. Imperative approach (for-loop)
const oldList = [];
for (let i = 0; i < developerSkills.length; i++) {
  oldList.push("Skill: " + developerSkills[i]);
}

// 2. Declarative approach (Array.prototype.map)
const modernList = developerSkills.map((skill) => "Skill: " + skill); // .map() creates a brand new array

console.log(modernList); 
// Output: ["Skill: JavaScript", "Skill: React", "Skill: Node.js"]

// Example of .map() in React JSX:
// return (
//   <ul>
//     {developerSkills.map((skill, index) => (
//       <li key={index}>{skill}</li>
//     ))}
//   </ul>
// );
