// Function declarations are hoisted, so they can be called before their definition.
console.log(calculateDiscount(100)); // 90

function calculateDiscount(price) {
  // A simple return-based calculation.
  return price * 0.9;
}

// Function expressions are stored in variables and are not available before initialization.
// console.log(applyTax(100)); // ReferenceError

const applyTax = function (amount) {
  // This behaves like any other function value.
  return amount * 1.15;
};

console.log(applyTax(100)); // 115

// Arrow functions are shorter and are common in React code.
const getUserRole = (isAdmin) => {
  // Use an explicit return when logic has more than one branch.
  if (isAdmin) {
    return 'Admin Dashboard';
  }
  return 'Guest View';
};

// Implicit return works when the function is a single expression.
const multiply = (a, b) => a * b;
console.log(multiply(5, 4)); // 20

// In React, a component can implicitly return JSX the same way.
/*const WelcomeBanner = (userName) => (
  <div className="banner">
    <h1>Welcome back, {userName}!</h1>
  </div>
);*/

// Functions are values, so they can be passed to other functions.
const executeAction = (actionCallback, data) => {
  console.log('Preparing to execute action...');
  actionCallback(data); // Executing the received function!
};

// A normal function that can be reused as a callback.
const logSuccess = (message) => {
  console.log('SUCCESS: ' + message);
};

// The callback is passed like any other variable.
executeAction(logSuccess, 'React component mounted!');