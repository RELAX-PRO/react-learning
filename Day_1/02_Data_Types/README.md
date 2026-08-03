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
