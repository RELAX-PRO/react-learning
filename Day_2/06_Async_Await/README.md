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
