# Variables: var, let, and const

In modern JavaScript, memory management and scope are strictly enforced using `let` and `const`. 

Before ES6, JavaScript only had `var`. `var` was "function-scoped", which meant if you declared a `var` inside an `if` statement or a `for` loop, it would leak out into the entire surrounding function. This caused massive, unpredictable bugs in large codebases where variables were accidentally overwritten.

Furthermore, `var` is "hoisted" to the top of its scope, meaning you could access a variable before it was even declared in the code (yielding `undefined`).

Modern JavaScript completely abandons `var`. Instead, we use block-scoped variables:
- `let`: Used when a variable's value will change over time.
- `const`: Used when a variable's identifier should never be reassigned.

### The Golden Rule in React
**Always default to `const`.** React heavily relies on immutability and predictability. If a value needs to change, it should probably be React State, not a local `let` variable. Only use `let` for tight local loops or algorithms.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

// Best practice: Use const for values that will never be reassigned.
// This signals to other developers that this value is stable.
const API_BASE_URL = "https://api.example.com/v1";

// Use let when you explicitly need to update the value later.
// For example, in a local counter or a tracking variable.
let loginAttempts = 0;

// Reassigning let is perfectly fine.
loginAttempts += 1;
loginAttempts = 5;

// If we tried to reassign API_BASE_URL, JavaScript would throw a TypeError!
// API_BASE_URL = "http://localhost:3000"; // THIS CRASHES!

console.log("URL:", API_BASE_URL, "| Attempts:", loginAttempts);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: const does NOT freeze objects!
  
  One of the biggest misconceptions in JavaScript is that `const` makes a value immutable.
  It does NOT. `const` only protects the *identifier* from being reassigned to a new memory address.
  
  If the value assigned to a `const` is a reference type (like an Object or an Array), 
  you can still mutate its internal contents freely!
*/

// We declare 'user' as const.
const user = { name: "Alice", role: "Admin" };

// We cannot do this:
// user = { name: "Bob" }; // CRASH: Assignment to constant variable.

// BUT, we CAN do this! We are mutating the property inside the object, 
// not replacing the object itself.
user.name = "Bob";
user.age = 30; // We can even add new properties!

const activeUsers = ["Alice"];
// Mutating the array is perfectly valid even though it's const.
activeUsers.push("Bob"); 

console.log("Mutated User:", user);
console.log("Mutated Array:", activeUsers);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Using var causes scope leakage.
  
  Because `var` ignores block scope (any code inside {}), it leaks out 
  into the global or function scope. This makes code impossible to predict.
*/

function processUsers() {
  const isWeekend = true;

  if (isWeekend) {
    // A junior developer uses 'var' here...
    var message = "It is the weekend!";
  }

  // BUG: 'message' leaked out of the if-statement! 
  // If we used 'let' or 'const', this console.log would throw a ReferenceError, which is much safer.
  console.log("Leaked var:", message);
  
  // ANTI-PATTERN 2: Hoisting
  // 'var' lets you access variables before they are declared!
  console.log("Hoisted value:", hoistedVar); // Prints 'undefined' instead of crashing!
  var hoistedVar = "I am hoisted";
}

processUsers();

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create a variable called `maxRetries` that cannot be reassigned, set to 3.
  2. Create a variable called `currentRetries` that can be reassigned, set to 0.
  3. Write a `while` loop that increments `currentRetries` until it reaches `maxRetries`.
  4. Ensure you do not use the `var` keyword anywhere.
*/

// Write your code below this line:
```
