// 1. Using var (The old way - Avoid this in React)
var oldSystem = "Legacy POS";
oldSystem = "Modern SaaS"; 

// 2. Using const (The modern default - Immutable binding)
const specialization = "UI/UX Designer";
// specialization = "Backend Developer"; // Error! TypeError: Assignment to constant variable.

// 3. Using let (For values that are expected to change)
let daysCompleted = 0;
daysCompleted = 1; // Perfectly fine

// Example of Scope Leak with var
function testVarScope() {
  var isUserLoggedIn = true;

  if (isUserLoggedIn) {
    var userRole = "Admin"; // Defined inside the if-block
  }

  // BUG: userRole leaked outside the if-block!
  console.log(userRole); // Output: "Admin" 
}

// Example of Block Scope protection with let
function testLetScope() {
  let isUserLoggedIn = true;

  if (isUserLoggedIn) {
    let userRole = "Admin"; // Safe inside this block
  }

  // SUCCESS: Protects from leakage, throws an error!
  console.log(userRole); // ReferenceError: userRole is not defined
}

// 1. Hoisting behavior with var (Silent Bug)
console.log(userScore); // Output: undefined (No error thrown!)
var userScore = 100;

// 2. Hoisting behavior with let (Safe & Strict)
console.log(playerLevel); // ReferenceError: Cannot access 'playerLevel' before initialization
let playerLevel = 5;

// Using var allows accidental overwriting
var appTitle = "My React App";
var appTitle = "New Title"; // No warning! Replaced silently.

// Using let prevents duplicate declarations
let componentName = "Header";
let componentName = "Footer"; // SyntaxError: Identifier 'componentName' has already been declared