// Function Declaration (Can be called BEFORE it is defined due to Hoisting)
console.log(calculateDiscount(100)); // Output: 90 (Works perfectly!)

function calculateDiscount(price) {
  return price * 0.9;
}

// Function Expression (Stored inside a const variable)
// console.log(applyTax(100)); // ❌ ReferenceError: Cannot access 'applyTax' before initialization

const applyTax = function(amount) {
  return amount * 1.15;
};

console.log(applyTax(100)); // Output: 115 (Works only after definition)

// 1. Standard Arrow Function (With brackets and explicit return)
const getUserRole = (isAdmin) => {
  if (isAdmin) {
    return "Admin Dashboard";
  }
  return "Guest View";
};

// 2. Implicit Return Arrow Function (One-liner! No braces {}, No 'return' keyword)
const multiply = (a, b) => a * b;
console.log(multiply(5, 4)); // Output: 20

// 🚀 HOW IT LOOKS IN REACT JSX (Implicitly returning UI components):
// We omit braces to instantly return JSX elements!
/*const WelcomeBanner = (userName) => (
  <div className="banner">
    <h1>Welcome back, {userName}!</h1>
  </div>
);*/

// Passing a function as an argument to another function (Callback pattern)
const executeAction = (actionCallback, data) => {
  console.log("Preparing to execute action...");
  actionCallback(data); // Executing the received function!
};

// Defining a simple arrow function to be passed
const logSuccess = (message) => {
  console.log("SUCCESS: " + message);
};

// Passing 'logSuccess' function just like any standard variable!
executeAction(logSuccess, "React component mounted!");