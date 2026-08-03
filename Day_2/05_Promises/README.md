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
