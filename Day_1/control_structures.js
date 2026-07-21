// 1. Traditional if/else (Cannot be used directly inside React JSX output)
let userBadge;
let userScore = 100;
if (userScore >= 100) {
  userBadge = "Gold VIP";
} else {
  userBadge = "Standard Member";
}
console.log(userBadge);
// 2. The Ternary Operator (The absolute favorite in React!)
const modernBadge = userScore >= 100 ? "Gold VIP" : "Standard Member";
console.log(modernBadge);

// 🚀 HOW IT LOOKS IN REACT JSX LATER:
// return (
//   <div>
//     {isLoggedIn ? <AdminDashboard /> : <LoginScreen />}
//   </div>
// );

// 1. Traditional switch statement (Verbose and requires multiple breaks)
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

// 2. Object Mapping (The modern, clean, and fast approach)
const statusMessages = {
  LOADING: "Please wait, fetching data...",
  SUCCESS: "Data loaded successfully!",
  ERROR: "Something went wrong!"
};

// We access the message dynamically using bracket notation!
const currentStatus = "SUCCESS";
const displayMessage = statusMessages[currentStatus] || "Unknown status";
console.log(displayMessage); // Output: "Data loaded successfully!"

const developerSkills = ["JavaScript", "React", "Node.js"];

// 1. The old way using for-loop (Imperative - Tells the machine HOW to step)
const oldList = [];
for (let i = 0; i < developerSkills.length; i++) {
  oldList.push("Skill: " + developerSkills[i]);
}

// 2. The modern way using .map() (Declarative - Focuses on WHAT you want)
// It transforms each element and returns a brand new array!
const modernList = developerSkills.map((skill) => "Skill: " + skill);

console.log(modernList); 
// Output: ["Skill: JavaScript", "Skill: React", "Skill: Node.js"]

// 🚀 HOW IT LOOKS IN REACT JSX LATER:
// We use .map() to transform an array of data into an array of HTML elements!
// return (
//   <ul>
//     {developerSkills.map((skill, index) => (
//       <li key={index}>{skill}</li>
//     ))}
//   </ul>
// );