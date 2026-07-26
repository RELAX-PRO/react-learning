// 1. Using var (Legacy declaration - Not recommended in modern React)
var oldSystem = "Legacy POS";
oldSystem = "Modern SaaS"; 

// 2. Using const (Modern default - Immutable binding)
const specialization = "UI/UX Designer";
// specialization = "Backend Developer"; // TypeError: Assignment to constant variable.

// 3. Using let (For values expected to change)
let daysCompleted = 0;
daysCompleted = 1;

// Example of Scope Leak with var
function testVarScope() {
  var isUserLoggedIn = true;

  if (isUserLoggedIn) {
    var userRole = "Admin"; // Defined inside the if-block
  }

  // userRole leaks outside the if-block
  console.log(userRole); // Output: "Admin" 
}

// Example of Block Scope protection with let
function testLetScope() {
  let isUserLoggedIn = true;

  if (isUserLoggedIn) {
    let userRole = "Admin"; // Scoped to this block
  }

  // Prevents leakage, throws a ReferenceError
  // console.log(userRole); // ReferenceError: userRole is not defined
}

// Hoisting behavior with var
console.log(userScore); // Output: undefined 
var userScore = 100;

// Hoisting behavior with let
// console.log(playerLevel); // ReferenceError: Cannot access 'playerLevel' before initialization
let playerLevel = 5;

// Using var allows accidental overwriting without warnings
var appTitle = "My React App";
var appTitle = "New Title"; 

// Using let prevents duplicate declarations in the same scope
let componentName = "Header";
// let componentName = "Footer"; // SyntaxError: Identifier 'componentName' has already been declared
