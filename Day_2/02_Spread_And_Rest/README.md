# Spread and Rest (...)

The `...` syntax is a chameleon in JavaScript. Depending on exactly where you place it, it performs two opposite behaviors: **Spread** and **Rest**.

### Spread (Unpacking)
It takes a structure (like an array or object) and *spreads* its contents out. 
This is crucial in React because React State is immutable. You cannot do `array.push(item)`. Instead, you use Spread to create a brand new array containing all the old items, plus the new one: `[...oldArray, newItem]`.

### Rest (Packing)
Used exclusively in function parameters or destructuring. It *gathers up* the remaining elements and packs them into a single array or object.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Spread vs Rest
*/

// 1. SPREAD: Copying and Merging Objects
const defaultStyle = { color: "black", fontSize: 14, margin: 0 };

// We create a BRAND NEW object (different memory reference).
// We spread the defaults in, then override the color.
const customStyle = { ...defaultStyle, color: "red" };
console.log("Merged Object:", customStyle);

// 2. REST: Gathering function arguments
// We explicitly grab the first item, then pack the 'REST' of the arguments into an array.
function calculateScore(player, ...scores) {
  console.log("Player:", player);
  console.log("Scores Array:", scores); 
}

calculateScore("Alice", 10, 20, 50);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Immutable Array Operations
  
  In React, mutating an array with .push(), .pop(), or .splice() is forbidden.
  You must use the Spread operator to generate completely new arrays.
*/

const oldCart = ["Apple", "Banana"];

// Push equivalent (Appends to the end)
const newCart = [...oldCart, "Orange"];

// Unshift equivalent (Prepends to the start)
const newCart2 = ["Orange", ...oldCart];

// Splicing (Inserting directly into the middle of the array)
const indexToInsert = 1;
const newCart3 = [
  ...oldCart.slice(0, indexToInsert), // Everything BEFORE the index
  "Orange",                           // The new item
  ...oldCart.slice(indexToInsert)     // Everything AFTER the index
];

console.log("Middle Insertion:", newCart3);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: The Deep Copy Illusion
  
  The spread operator only creates a SHALLOW copy. 
  It copies the top-level properties. But if your object contains nested objects 
  or arrays, those nested items still share the exact same memory reference!
*/

const user = { 
  name: "Alice", 
  profile: { age: 25 } // Nested object!
};

// We think we are making a safe copy...
const copiedUser = { ...user };

// We mutate the copy...
copiedUser.profile.age = 30;

// BUG: user.profile.age is ALSO 30 now! 
// Spread cloned the top level, but 'profile' is just a shared pointer.
console.log("Original user's age was ruined:", user.profile.age);

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create an array 'arr1' with [1, 2, 3].
  2. Create 'arr2' with [4, 5, 6].
  3. Use the spread operator to create a single array called 'combined' which is [1, 2, 3, 4, 5, 6].
*/

// Write your code below this line:
```
