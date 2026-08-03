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

# ES6 Classes

JavaScript is not a traditional Object-Oriented language like Java or C#. Under the hood, JavaScript uses "Prototypal Inheritance". ES6 Classes are just "syntactic sugar"—a cleaner way to write prototype logic.

### Why learn Classes for React?
Modern React (post-2019) almost exclusively uses Functional Components. However, you MUST understand classes for two reasons:
1. **Legacy Codebases:** You will inevitably work on a project built before 2019 that uses Class Components (`class UserProfile extends React.Component`).
2. **Error Boundaries:** In React, catching unexpected UI crashes can currently *only* be done using a Class Component.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Constructors and Inheritance
*/

class Animal {
  // The constructor runs immediately when 'new' is called.
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// 'extends' allows Dog to inherit all properties and methods from Animal.
class Dog extends Animal {
  constructor(name, breed) {
    // You MUST call super() to trigger the parent class's constructor!
    super(name); 
    this.breed = breed;
  }
  
  // We can override the parent's speak method.
  speak() {
    console.log(`${this.name} barks!`);
  }
}

const dog = new Dog("Rex", "German Shepherd");
dog.speak();

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Static Methods and Private Fields
*/

class MathHelper {
  // Private field (starts with #). This cannot be accessed outside the class!
  #pi = 3.14159;

  // Static methods belong to the Class itself, NOT to instances of the class.
  static add(a, b) {
    return a + b;
  }

  getPi() {
    return this.#pi;
  }
}

// We call 'add' directly on the blueprint (the Class).
console.log("Static Math:", MathHelper.add(5, 5)); // 10

// We must create an instance to access non-static methods.
const helper = new MathHelper();
console.log("Accessing private field via method:", helper.getPi());

// console.log(helper.#pi); // THIS CRASHES! Private field is hidden.

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Losing 'this' in Class Methods
  
  This was the most infamous bug in early React development.
  If you pass a class method as a callback to an event listener, 
  it loses its connection to the class instance!
*/

class BrokenButton {
  constructor() {
    this.clicks = 0;
  }
  
  handleClick() {
    // If this method is attached to a UI button, 'this' becomes undefined!
    // this.clicks++; // CRASH! Cannot read properties of undefined.
  }
}

// THE FIX: Use an Arrow Function for the method. 
// Arrow functions automatically bind 'this' to the class instance!
class WorkingButton {
  constructor() {
    this.clicks = 0;
  }
  
  handleClick = () => {
    this.clicks++;
    console.log("Clicked:", this.clicks);
  }
}

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create a class 'Car' with a constructor that takes a 'brand' parameter.
  2. Add an arrow function method 'drive' that logs "Driving the [brand]".
  3. Instantiate the class and call the drive method.
*/

// Write your code below this line:
```

# Promises

JavaScript is strictly single-threaded. It can only execute one line of code at a time. If you make a network request to a database that takes 5 seconds, JavaScript cannot freeze the entire browser window while it waits!

To solve this, asynchronous operations run in the background. A **Promise** is a special object that acts as a placeholder for the data that isn't there yet.

### The 3 States of a Promise:
1. **Pending:** The request is currently flying through the internet.
2. **Fulfilled:** The server responded with data! The `.then()` block triggers.
3. **Rejected:** The server crashed, or Wi-Fi dropped. The `.catch()` block triggers.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Creating and Consuming a Promise
*/

// 1. CREATING A PROMISE
const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    // Simulating a network delay of 1 second
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ name: "Alice", role: "Admin" }); // Triggers .then()
      } else {
        reject("Network Error: 500"); // Triggers .catch()
      }
    }, 1000);
  });
};

// 2. CONSUMING THE PROMISE
console.log("1. Request initiated...");

fetchUserData()
  .then(data => {
    console.log("2. Success! Received data:", data.name);
  })
  .catch(error => {
    console.error("2. Failed:", error);
  })
  .finally(() => {
    // This runs regardless of success or failure. Perfect for hiding Loading Spinners!
    console.log("3. Request finished."); 
  });

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Promise.all()
  
  If you have multiple API requests that DO NOT depend on each other 
  (e.g., fetching a User profile, and fetching a list of global Products),
  running them sequentially is a massive waste of time.
  
  Promise.all() launches them in parallel, waiting for all of them to finish.
*/

// Simulating API calls
const fetchUsers = Promise.resolve(["Alice", "Bob"]);
const fetchPosts = Promise.resolve(["Post 1", "Post 2"]);

console.log("Launching parallel requests...");

// Pass an array of promises
Promise.all([fetchUsers, fetchPosts])
  .then(([users, posts]) => { // Array destructuring on the results!
    console.log("Both requests finished in parallel!");
    console.log("Users:", users);
    console.log("Posts:", posts);
  });

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Callback Hell (The Pyramid of Doom)
  
  Before Promises were added to JavaScript, handling asynchronous code 
  required passing callback functions into callback functions.
  
  This created deeply nested code that was impossible to read, and made 
  error handling a complete nightmare.
*/

function fetchLegacy(callback) {
  setTimeout(() => {
    callback({ id: 1 });
  }, 100);
}

// The Pyramid of Doom:
fetchLegacy((user) => {
  // getPosts(user.id, (posts) => {
    // getComments(posts[0].id, (comments) => {
      // If an error happens here, how do you gracefully handle it?
      // You can't. This pattern is obsolete.
    // });
  // });
});

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create a Promise that resolves with the string "Data Loaded" after 2 seconds.
  2. Call .then() on it and log the result.
  3. Call .finally() on it to log "Process complete".
*/

// Write your code below this line:
```

# Async / Await

While `.then()` and `.catch()` are vastly superior to callback hell, they still require chaining functions together, which can become visually noisy.

In 2017, JavaScript introduced `async` and `await`. This is **syntactic sugar** built directly on top of Promises. It allows you to write asynchronous code that reads exactly like synchronous, top-to-bottom code.

- **`async`**: Put this in front of a function. It forces the function to automatically return a Promise.
- **`await`**: Can only be used inside an `async` function. It literally *pauses* the execution of that specific function until the Promise resolves, while letting the rest of the app continue running normally!


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: The Top-to-Bottom Flow
*/

const fetchPosts = () => Promise.resolve(["React Guide", "JS Tips"]);

async function loadData() {
  // Because we use async/await, we can use standard try/catch blocks for errors!
  try {
    console.log("1. Fetching...");
    
    // The function pauses on this exact line until the data arrives.
    const posts = await fetchPosts(); 
    
    // This line will not execute until 'posts' is fully populated!
    console.log("2. Success:", posts);
    
  } catch (error) {
    console.error("Failed to load:", error);
  }
}

loadData();

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Await inside loops (The Waterfall Trap)
  
  Using 'await' inside a standard for-loop forces the loop to pause on every iteration.
  If each fetch takes 1 second, a loop of 5 items will take 5 seconds (A Waterfall).
  
  Use Promise.all() to launch them concurrently.
*/

const ids = [1, 2, 3];
const fakeFetch = (id) => Promise.resolve(`Data ${id}`);

async function fetchAllInParallel() {
  // 1. .map() instantly creates an array of 3 pending Promises (no waiting yet).
  const promises = ids.map(id => fakeFetch(id));
  
  // 2. We await all 3 promises simultaneously. 
  // Total time taken: 1 second (instead of 3 seconds sequentially).
  const results = await Promise.all(promises);
  
  console.log("Parallel Results:", results);
}

fetchAllInParallel();

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Forgetting to await
  
  If you forget the `await` keyword, the code will not pause. 
  The variable will simply hold a "Pending Promise" object, rather than the actual data.
*/

const fetchPosts = () => Promise.resolve(['Post 1', 'Post 2']);

async function brokenLoad() {
  
  // We forgot the await keyword!
  const posts = fetchPosts(); 
  
  // 'posts' is a Promise object, not an array.
  // Trying to read index [0] of a Promise object yields undefined.
  console.log('Broken Result:', posts[0]); 
}

brokenLoad();

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Write an async function called 'init'.
  2. Inside it, use the 'await' keyword to pause execution until a 'fetchPosts()' call resolves.
  3. Wrap the await in a try/catch block to handle potential errors cleanly.
*/

// Write your code below this line:
```

