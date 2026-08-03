/**
 * Block Comment: Function Mechanics and Context
 * Functions in JavaScript are "first-class citizens," meaning they can be stored in variables,
 * passed as arguments to other functions, and returned from other functions.
 * Function declarations are completely "hoisted," meaning the JavaScript engine loads them into 
 * memory during the compilation phase, allowing you to call them before they appear in code.
 * Arrow functions do not bind their own 'this' context, which historically made them highly desirable 
 * for callbacks in React class components, and they provide a concise syntax for functional components today.
 */

// Function declarations are hoisted and can be called before their definition.
console.log(calculateDiscount(100)); // 90

function calculateDiscount(price) { // Standard function declaration
  return price * 0.9;
}

// Function expressions are stored in variables and are not hoisted.
// console.log(applyTax(100)); // ReferenceError

const applyTax = function (amount) { // Anonymous function assigned to a const variable
  return amount * 1.15;
};

console.log(applyTax(100)); // 115

// Arrow functions provide a concise syntax, often used in React components.
const getUserRole = (isAdmin) => { // Arrow syntax
  if (isAdmin) {
    return 'Admin Dashboard';
  }
  return 'Guest View';
};

// Implicit return works when the function is a single expression.
const multiply = (a, b) => a * b;
console.log(multiply(5, 4)); // 20

// In React, functional components can utilize implicit returns for JSX.
/*
const WelcomeBanner = ({ userName }) => (
  <div className="banner">
    <h1>Welcome back, {userName}!</h1>
  </div>
);
*/

// Functions are first-class citizens and can be passed as arguments.
const executeAction = (actionCallback, data) => {
  console.log('Preparing to execute action...');
  actionCallback(data);
};

const logSuccess = (message) => {
  console.log('SUCCESS: ' + message);
};

executeAction(logSuccess, 'React component mounted!');
