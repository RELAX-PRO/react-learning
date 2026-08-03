# ES6 Modules (import / export)

Before ES6, JavaScript didn't have a native module system. All scripts loaded into the browser shared the same global `window` object. If two scripts both defined a variable called `user`, one would overwrite the other, crashing the app.

ES6 Modules fix this. Every file is its own isolated universe. Variables and functions inside a file are completely private unless you explicitly `export` them.

### Two Types of Exports:
1. **Named Exports:** You can export as many things as you want from a file. When importing, you must use curly braces `{}` and match the exact name.
2. **Default Exports:** You can only have ONE default export per file. When importing, you do not use curly braces, and you can name the import whatever you want.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Exporting and Importing
  (Note: This is pseudo-code representation to show the syntax)
*/

// --- INSIDE 'mathUtils.js' ---
// You can have multiple named exports
// export const add = (a, b) => a + b;
// export const sub = (a, b) => a - b;

// You can have ONLY ONE default export
// export default function calculate() { return "calculating..."; }


// --- INSIDE 'App.js' ---
// Notice the syntax differences:
// Default import has NO curly braces. Named imports REQUIRE curly braces.
// import calculate, { add, sub } from "./mathUtils";

console.log("Modules keep code perfectly isolated and reusable!");

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Aliasing and Wildcard Imports
  
  What happens if you import a function called 'add', but you already have a 
  local function named 'add'? You use the 'as' keyword to rename it on the fly!
*/

// Renaming an import to prevent a naming collision:
// import { add as addNumbers } from "./mathUtils";


/*
  If a file exports 50 different helper functions, importing them all individually 
  is annoying. You can use the Wildcard (*) to grab everything and shove it 
  into a single namespace object.
*/

// import * as MathUtils from "./mathUtils";

// Now you can access everything via the namespace:
// MathUtils.add(1, 2);
// MathUtils.sub(5, 2);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: The Old Way (Global Scope Pollution)
  
  Before ES6 Modules, developers had to attach their code to the global 'window' object 
  just so other files could access it.
*/

// window.mathUtils = { 
//   add: (a, b) => a + b 
// };

// Why is this terrible?
// Any 3rd party script (like analytics or an ad tracker) running on the same page 
// could accidentally execute:
// window.mathUtils = "hacked";
// Now your entire application crashes because it expected mathUtils to be an object!

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Write the syntax to export a function called 'formatDate' as a NAMED export.
  2. Write the syntax to export a function called 'App' as a DEFAULT export.
  3. Write the syntax to import both of them into a new file on a single line.
*/

// Write your code below this line:
```
