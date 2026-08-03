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
