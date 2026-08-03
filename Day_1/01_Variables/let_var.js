/**
 * Block Comment: var vs let vs const and Scope
 * The 'var' keyword uses function scope or global scope and is hoisted with an 'undefined' initial value.
 * This can lead to bugs where variables are accessed before their intentional assignment, or accidentally 
 * leak out of block scopes (like loops and if-statements).
 * 
 * 'let' and 'const' use block scope (lexical scope constrained by {}). They are also hoisted but placed 
 * in a "Temporal Dead Zone" (TDZ) until their declaration is evaluated, preventing access before initialization.
 * 'let' is used for values that will change, while 'const' prevents reassignment.
 */

// 1. Using var (Legacy declaration - Not recommended in modern React)
var oldSystem = "Legacy POS";
oldSystem = "Modern SaaS"; 

// 2. Using const (Modern default - Immutable binding)
const specialization = "UI/UX Designer";
// specialization = "Backend Developer"; // TypeError: Assignment to constant variable.

// 3. Using let (For values expected to change)
let daysCompleted = 0; // 'let' allows value updates safely within its block scope.
daysCompleted = 1;

// Example of Scope Leak with var
function testVarScope() {
  var isUserLoggedIn = true;

  if (isUserLoggedIn) {
    var userRole = "Admin"; // Defined inside the if-block, but 'var' ignores block scope.
  }

  // userRole leaks outside the if-block
  console.log(userRole); // Output: "Admin" 
}

// Example of Block Scope protection with let
function testLetScope() {
  let isUserLoggedIn = true;

  if (isUserLoggedIn) {
    let userRole = "Admin"; // Scoped strictly to this block {} due to 'let'.
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
