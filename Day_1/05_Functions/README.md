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
