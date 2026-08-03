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

# Data Types: Primitives vs References

JavaScript divides data into two distinct categories: Primitives and References. 
Understanding the deep mechanical difference between these two is arguably the **most important prerequisite for mastering React state management**.

### Primitives
These are simple values: `String`, `Number`, `Boolean`, `Null`, `Undefined`, and `Symbol`.
- **Memory:** They are stored directly in the Call Stack.
- **Comparison:** They are compared by their *actual value*. (e.g., `10 === 10` is true).
- **Behavior:** When you assign a primitive to a new variable, it creates a true, independent copy.

### References
These are complex values: `Objects`, `Arrays`, and `Functions`.
- **Memory:** They are too large for the Call Stack. They are stored in the Memory Heap. The variable merely holds a "pointer" (a memory address) to that location in the heap.
- **Comparison:** They are compared by their *memory address*, NOT their contents. (e.g., `[] === []` is false because they are two different locations in memory).
- **Behavior:** When you assign an object to a new variable, you are ONLY copying the pointer. Both variables now point to the exact same object. Changing one changes the other!


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Values vs. Addresses
  Observe how JavaScript treats primitives vs references differently when checking equality.
*/

// 1. Primitives (Compared by actual value)
const a = 10;
const b = 10;
console.log("Do primitives match?", a === b); // TRUE. 10 is 10.

// 2. References (Compared by memory address)
const obj1 = { id: 1 };
const obj2 = { id: 1 };
// Even though they look identical to humans, they exist in different spaces in the computer's memory.
console.log("Do objects match?", obj1 === obj2); // FALSE! 

// 3. Shared References
const originalArray = [1, 2, 3];
const pointerArray = originalArray; // We did NOT copy the array! We copied the address.

console.log("Do shared references match?", originalArray === pointerArray); // TRUE. They are the exact same array in memory.

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Safe Object Comparison
  If `{ id: 1 } === { id: 1 }` evaluates to false, how do we actually check if two objects contain the same data?
*/

const obj1 = { id: 1, name: "Alice", role: "Admin" };
const obj2 = { id: 1, name: "Alice", role: "Admin" };

// Pattern 1: Shallow Property Comparison
// Fast, but you have to manually check every single property.
const isShallowMatch = (
  obj1.id === obj2.id && 
  obj1.name === obj2.name && 
  obj1.role === obj2.role
);
console.log("Shallow Match:", isShallowMatch); // true

// Pattern 2: Deep Stringification
// Slower, but works automatically for deeply nested objects.
// Warning: This breaks if object keys are in different orders!
const isDeepMatch = JSON.stringify(obj1) === JSON.stringify(obj2);
console.log("Deep Match (JSON):", isDeepMatch); // true

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Accidental Mutation via Shared References.
  
  This is the #1 cause of bugs for junior React developers. 
  When you assign an object/array to a new variable, you do not copy the data.
  If you mutate the "new" variable, you silently destroy the original data!
*/

const systemConfig = { theme: "dark", isAdmin: false };

// A junior developer tries to create a copy for a specific user:
const userConfig = systemConfig; 

// They mutate the "copy"
userConfig.isAdmin = true;

// DISASTER! The entire system configuration is now set to Admin!
// Because userConfig and systemConfig are literally the same object in memory.
console.log("System Config isAdmin:", systemConfig.isAdmin); // Prints TRUE!

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create an object called `player1` with properties `name` ("Hero") and `score` (100).
  2. How would you create a `player2` object that starts with the exact same data as `player1`, 
     but without sharing the same memory reference? 
     (Hint: You cannot just do `const player2 = player1`. You must create a brand new `{}`).
  3. Mutate `player2.score` to 500, and console.log both objects to prove `player1` was not affected.
*/

// Write your code below this line:
```

# Operators: Logical and Nullish Coalescing

In traditional JavaScript, you use `if/else` blocks to control logic. However, in React, you cannot put an `if` statement directly inside JSX (the HTML-like syntax). 

Because of this, React developers rely heavily on inline logical operators to conditionally render UI components and assign fallback values.

### The Core Operators:
1. **Logical AND (`&&`)**: Returns the right side if the left side is "truthy". Used for "If this is true, show this component."
2. **Logical OR (`||`)**: Returns the right side if the left side is "falsy" (like `0`, `""`, `null`, `false`).
3. **Nullish Coalescing (`??`)**: Returns the right side *only* if the left side is strictly `null` or `undefined`. This is much safer than `||` when dealing with numbers like `0`.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Inline Logic
*/

// 1. Logical AND (&&) for conditional execution
const isLoggedIn = true;
// In React, this looks like: isLoggedIn && <Dashboard />
isLoggedIn && console.log("Render Dashboard Component");

// 2. Nullish Coalescing (??) for safe default values
// If the API fails to return a name, fallback to "Guest"
const apiResponseName = null;
const displayName = apiResponseName ?? "Guest";
console.log("Welcome,", displayName); // Prints "Welcome, Guest"

// 3. Ternary Operator (? :) for If/Else
const isPremium = false;
// In React, this looks like: isPremium ? <ProBadge /> : <UpgradeButton />
const badge = isPremium ? "Pro User" : "Free User";
console.log("Badge status:", badge);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Optional Chaining (?.)
  
  When fetching data from an API, objects are often deeply nested. 
  If you try to read a property deep inside an object that doesn't exist, your entire app crashes!
  
  Optional chaining safely returns `undefined` instead of throwing a TypeError.
*/

const response = {
  data: {
    user: {
      // Notice: the 'profile' object is completely missing from this data!
    }
  }
};

// Instead of this massive, ugly check:
// const oldWay = response && response.data && response.data.user && response.data.user.profile && response.data.user.profile.avatar;

// Use optional chaining combined with nullish coalescing to safely extract deep data:
const avatar = response?.data?.user?.profile?.avatar ?? 'default_avatar.png';

console.log('Safe Avatar Extraction:', avatar); // Prints 'default_avatar.png' without crashing!

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Using || instead of ?? for numbers and booleans.
  
  The || operator checks for "falsy" values. In JavaScript, 0, "", and false are all falsy!
  If a user deliberately sets a volume to 0, or a setting to false, the || operator 
  will override their choice with your default value.
*/

const userSettings = {
  volume: 0, // The user deliberately muted the volume
  darkMode: false // The user deliberately chose light mode
};

// BUG: || sees 0 and false as falsy, and overrides the user's settings!
const badVolume = userSettings.volume || 100; 
const badTheme = userSettings.darkMode || true;

console.log("Bad Volume:", badVolume); // Prints 100! We unmuted them!
console.log("Bad Theme:", badTheme); // Prints true! We forced dark mode!

// FIX: Always use ?? when 0 or false are valid data inputs.
const goodVolume = userSettings.volume ?? 100;
console.log("Good Volume:", goodVolume); // Correctly prints 0.

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create an object called `apiConfig` that has NO `timeout` property.
  2. Create a variable called `activeTimeout`. Safely extract `timeout` from `apiConfig`. 
     If it is missing, use the `??` operator to default it to `5000`.
  3. Create a boolean `isLoading` set to true. 
     Write a single line using `&&` that logs "Spinner..." if `isLoading` is true.
*/

// Write your code below this line:
```

# Control Structures: The Functional Approach

In standard JavaScript, if you want to loop over an array, you use a `for` loop. If you want to build a new array based on some condition, you push items into a new array inside that loop.

**React fundamentally rejects this imperative approach.** 

React embraces the declarative, functional programming paradigm. This means you should describe *what* you want the data to look like, rather than writing the step-by-step instructions on *how* to build it.

To do this, we abandon `for` loops and heavily rely on three native array methods:
1. **`.map()`**: Transforms every item in an array into something else, returning a brand new array of the exact same length. (Used constantly to render lists of JSX elements).
2. **`.filter()`**: Tests every item against a condition. Returns a brand new array containing only the items that passed.
3. **`.reduce()`**: Compresses an entire array into a single value (like a number, string, or a single object).


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: .filter() and .map()
  Notice how we never mutate the original 'users' array. 
  Every method returns a brand new array, preserving immutability!
*/

const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true }
];

// 1. FILTER: We want a new array containing ONLY active users.
const activeUsers = users.filter(user => user.active === true);
// activeUsers is now an array of 2 objects (Alice and Charlie)

// 2. MAP: We want to transform the array of objects into an array of just strings (names).
// In React, you would use this to transform data into JSX: users.map(user => <li>{user.name}</li>)
const userNames = activeUsers.map(user => user.name);

console.log("Active User Names:", userNames); // ['Alice', 'Charlie']

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Chaining Methods and .reduce()
  Because .filter() and .map() return arrays, you can chain them directly together 
  to form incredibly powerful, one-line data transformation pipelines.
*/

const products = [
  { id: 1, name: "Laptop", price: 1000, inStock: true },
  { id: 2, name: "Mouse", price: 50, inStock: false },
  { id: 3, name: "Keyboard", price: 100, inStock: true }
];

// Chaining: Filter out out-of-stock items, then extract their names.
const availableProductNames = products
  .filter(p => p.inStock)
  .map(p => p.name);

console.log("Available:", availableProductNames);

// Reduce: Compress an array into a single value (Total Inventory Value)
const totalInventoryValue = products
  .filter(p => p.inStock) // Only count in-stock items
  .reduce((accumulator, product) => {
    return accumulator + product.price; // Add the price to the running total
  }, 0); // The '0' is the starting value for the accumulator

console.log("Total Value: $", totalInventoryValue);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: The Imperative For-Loop
  
  While for-loops are technically slightly faster in pure computation, 
  they are verbose, prone to off-by-one errors (i <= length), and force you 
  to use mutable variables (let i, let activeNames = []). 
  
  In React, this is considered highly unreadable and an anti-pattern.
*/

const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true }
];

// This requires a mutable array to store the results.
let activeNames = [];

for (let i = 0; i < users.length; i++) {
  // If we mess up the logic here, we mutate data incorrectly.
  if (users[i].active) {
    activeNames.push(users[i].name);
  }
}

// This achieved the exact same thing as our beautiful .filter().map() chain, 
// but took 3x as many lines of code and required mutable state.
console.log(activeNames);

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Given this array: `const numbers = [1, 2, 3, 4, 5, 6];`
  2. Use `.filter()` to keep only the even numbers (hint: `num % 2 === 0`).
  3. Chain `.map()` onto the result to multiply those even numbers by 10.
  4. Console log the final array (should be [20, 40, 60]).
*/

// Write your code below this line:
```

# Functions: Declarations vs Arrows

In JavaScript, there are two primary ways to write a function: the traditional **Function Declaration**, and the modern ES6 **Arrow Function**.

Arrow functions (`() => {}`) are not just a shorter syntax. They fundamentally alter how the `this` keyword behaves in JavaScript, which is why they are heavily favored in modern React.

### 1. Function Declarations
```js
function greet() { ... }
```
- **Hoisting:** They are hoisted to the top of their scope. You can call them *before* they are defined in the file.
- **Dynamic `this`:** The value of `this` changes depending on *how* the function is called.

### 2. Arrow Functions
```js
const greet = () => { ... }
```
- **No Hoisting:** They act like standard `const` variables. You must define them before you call them.
- **Lexical `this`:** They do not have their own `this`. They inherit `this` from whatever scope they were created in. This prevents massive bugs when passing functions as callbacks.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Syntax Differences
*/

// Standard Function Declaration
// Because of hoisting, this works even though it's called before definition.
console.log(standardGreet("Alice"));

function standardGreet(name) {
  return `Hello, ${name}!`;
}


// Arrow Function Expression
// Notice how much cleaner this is. If the function only has one line of code,
// you can omit the {} and the 'return' keyword entirely! (Implicit Return)
const arrowGreet = (name) => `Hello, ${name}!`;

// You MUST call arrow functions after they are defined.
console.log(arrowGreet("Bob"));

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Returning Objects with Arrow Functions
  
  Arrow functions have an "implicit return" feature if you omit the curly braces.
  But what if you want to implicitly return an Object? 
  The JavaScript engine will get confused and think the object's {} are the function body!
*/

// WRONG WAY: The engine thinks {} is the function body, and crashes.
// const createBrokenUser = (name, age) => { name: name, age: age }; 

// CORRECT WAY: Wrap the object in parentheses () to tell the engine it's an expression.
const createUser = (name, age) => ({
  id: Math.floor(Math.random() * 1000), // Generate a random ID
  name: name,
  age: age
});

const newUser = createUser("Alice", 28);
console.log("New User Object:", newUser);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Losing the 'this' context in callbacks.
  
  When you pass a standard function into a timer (setInterval) or an event listener, 
  it gets called in a different context, completely losing its original `this`.
*/

const brokenCounter = {
  seconds: 0,
  start() {
    // We pass a standard function to setInterval
    setInterval(function() {
      // BUG: Inside this callback, 'this' refers to the global Window/Node object, 
      // NOT the brokenCounter object! 
      // this.seconds++; // This would result in NaN.
    }, 1000);
  }
};

const workingCounter = {
  seconds: 0,
  start() {
    // FIX: Arrow functions don't have their own 'this'. 
    // They inherit it from the parent start() method!
    setInterval(() => {
      this.seconds++;
      console.log("Tick:", this.seconds);
    }, 1000);
  }
};

// workingCounter.start(); // Uncomment to run

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Write a standard function declaration called `multiply` that takes two parameters (a, b) and returns their product.
  2. Rewrite the exact same logic as an arrow function called `multiplyArrow`.
  3. Ensure `multiplyArrow` uses the implicit return syntax (no curly braces {}, no `return` keyword).
*/

// Write your code below this line:
```

# Template Literals

Before ES6, combining variables and text in JavaScript meant using the `+` operator to endlessly concatenate strings. This was incredibly messy, highly prone to spacing errors, and made writing multi-line strings (like HTML templates) a nightmare involving `\n`.

**Template Literals** revolutionized string manipulation. 
By wrapping your string in backticks (` `), you unlock two massive superpowers:
1. **String Interpolation:** You can inject variables or execute JavaScript expressions directly inside the string using the `${}` syntax.
2. **Multi-line Strings:** You can simply press 'Enter' in your code, and the line break is perfectly preserved in the final string.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Interpolation and Line Breaks
*/

const user = "Alice";
const unreadCount = 5;

// Clean, readable string interpolation using ${}
const notification = `Hello ${user}, you have ${unreadCount} new messages!`;
console.log(notification);

// Multi-line strings are effortless. 
// This is exactly how we write HTML templates in raw JavaScript!
const emailTemplate = `
  Hi ${user},
  
  We noticed you haven't logged in recently.
  You have ${unreadCount} notifications waiting for you.
  
  Thanks,
  The Team
`;

console.log(emailTemplate);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Executing logic inside ${}
  
  The ${} syntax doesn't just hold variables. It can execute ANY valid JavaScript 
  expression, including math, ternary operators, and function calls!
*/

const user = { name: "Bob", isPro: true };

function getDiscount() {
  return "20% Off";
}

// Executing complex logic directly inside the string
const checkoutMessage = `
  Checkout for: ${user.name.toUpperCase()}
  Account Type: ${user.isPro ? "Premium Member" : "Free Tier"}
  Active Promo: ${user.isPro ? getDiscount() : "None"}
`;

console.log(checkoutMessage);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Old school string concatenation (+)
  
  Relying on the + operator for strings is extremely prone to spacing errors,
  looks messy, and is very difficult for other developers to quickly read.
*/

const user = "Alice";
const role = "Admin";

// Awful to read, easy to forget spaces before or after the quotes.
const str = "User " + user + " has logged in as " + role + ".";

// An absolute nightmare for multi-line HTML strings.
const html = "<div>\n" +
"  <h1>" + user + "</h1>\n" +
"  <p>Role: " + role + "</p>\n" +
"</div>";

console.log(html);

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create variables for `firstName`, `lastName`, and `age`.
  2. Use a template literal to create a multi-line string containing a short bio.
  3. Inside the template literal, use a JavaScript expression to calculate 
     what year they were born (e.g., 2024 - age) and display it!
*/

// Write your code below this line:
```

