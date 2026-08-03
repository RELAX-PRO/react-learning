# Destructuring

Destructuring is arguably the most common ES6 feature you will see in React code. It provides a clean, elegant syntax to unpack values from arrays, or properties from objects, into distinct variables.

### Why is this so important for React?
In React, components constantly receive a single object called `props` that contains all the data passed from the parent. Without destructuring, your code would be littered with `props.name`, `props.age`, `props.isActive`. Destructuring allows you to unpack those properties directly in the function signature.

Additionally, the most famous React Hook, `useState()`, returns an array containing two items. You MUST use array destructuring to extract those items into usable variables.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Unpacking Objects and Arrays
*/

const user = { id: 1, name: "Alice", role: "Admin" };

// Object Destructuring
// We pull 'name' and 'role' directly out of the object into their own variables.
const { name, role } = user;
console.log("User:", name, "Role:", role);

// Array Destructuring
// Used constantly in React's useState Hook!
const rgb = [255, 128, 0];

// The names of the variables don't matter, only the ORDER matters for arrays.
const [red, green, blue] = rgb;
console.log("Red Value:", red);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Renaming, Defaults, and Deep Nested Destructuring
*/

const apiResponse = {
  status: 200,
  data: {
    user: { name: 'Alice' }
  }
  // note: 'theme' is completely missing from this response!
};

const {
  status: statusCode, // 1. RENAMING: We rename 'status' to 'statusCode'
  theme = 'dark',     // 2. DEFAULT VALUE: If 'theme' is missing, fallback to 'dark'
  data: { user: { name } } // 3. NESTED: We dig three levels deep to grab 'name' directly!
} = apiResponse;

console.log("Code:", statusCode);
console.log("Theme:", theme);
console.log("Name extracted deeply:", name);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Manual Property Digging
  
  Before destructuring, developers had to manually access every single property,
  leading to highly verbose, repetitive code.
*/

const user = { id: 1, name: "Alice", profile: { avatar: "pic.jpg" } };

// Verbose and repetitive. Imagine doing this for 10 properties!
const id = user.id;
const name = user.name;
const avatar = user.profile.avatar;

// Even worse in function parameters:
function renderProfile(userObj) {
  // We have to type 'userObj.' every single time.
  console.log("Hello", userObj.name);
  console.log("Avatar:", userObj.profile.avatar);
}

// THE RIGHT WAY: function renderProfile({ name, profile: { avatar } }) { ... }

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Given this nested object: `const config = { db: { host: "localhost", port: 5432 } };`
  2. Write a single line of destructuring that extracts `host` and `port`.
  3. Ensure that if `password` is missing, you assign it a default value of "secret".
*/

// Write your code below this line:
```
