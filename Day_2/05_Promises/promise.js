/*
  =========================================
  PROMISES IN JAVASCRIPT
  =========================================
  A Promise represents the eventual completion (or failure) of an asynchronous 
  operation and its resulting value. It has three possible states:
  1. Pending: Initial state, neither fulfilled nor rejected.
  2. Fulfilled: The operation completed successfully (resolved).
  3. Rejected: The operation failed (rejected).
  
  Under the hood, promises use the Microtask Queue. Handlers attached via `.then()`, 
  `.catch()`, or `.finally()` are scheduled as microtasks, meaning they will execute 
  immediately after the synchronous call stack is clear, but before any Macrotasks 
  (like setTimeout).
*/

// A Promise represents the eventual completion (or failure) of an asynchronous operation.
const fetchUserProfile = new Promise((resolve, reject) => {
  // This executor function runs synchronously when the Promise is constructed.
  console.log('Server: fetching user profile...');

  setTimeout(() => { // setTimeout pushes the callback to the Macrotask queue
    // Simulated condition for success or failure.
    const isServerOnline = true;

    if (isServerOnline) {
      // Resolves the promise with the requested data.
      resolve({ id: 101, username: 'Majed_IQ', role: 'Developer' }); // State becomes Fulfilled
      return;
    }

    // Rejects the promise if an error occurs.
    reject(new Error('Server is offline or connection timed out.')); // State becomes Rejected
  }, 2000);
});

console.log('App: starting request...');

// Handling the promise outcome.
/*
  Chainability: `.then`, `.catch`, and `.finally` return new Promises, 
  which allows for chaining multiple asynchronous operations.
*/
fetchUserProfile
  .then((data) => {
    // Executed upon successful resolution. (Pushed to Microtask queue upon resolution)
    console.log('SUCCESS: data received successfully!', data);
    console.log(`Welcome back, ${data.username}!`);
  })
  .catch((error) => {
    // Executed if the promise is rejected.
    console.error('FAILED: could not load profile.', error.message);
  })
  .finally(() => {
    // Executed after the promise settles, regardless of success or failure.
    console.log('App: request cycle completed.');
  });

// Demonstrating asynchronous execution.
console.log('App: this line executes immediately, not waiting for the promise.');

const checkInventory = new Promise((resolve, reject) => {
  const itemInStock = false;

  if (itemInStock) {
    resolve('Item is available! Proceeding to checkout.');
    return; // Early return to stop execution
  }

  reject(new Error('Out of stock! Cannot complete purchase.'));
});

checkInventory
  .then((message) => {
    console.log('THEN: ' + message);
  })
  .catch((error) => {
    console.log('CATCH: ' + error.message);
  })
  .finally(() => {
    console.log('FINALLY: inventory check finished.');
  });
