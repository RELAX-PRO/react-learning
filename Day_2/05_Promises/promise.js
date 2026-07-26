// A Promise represents the eventual completion (or failure) of an asynchronous operation.
const fetchUserProfile = new Promise((resolve, reject) => {
  console.log('Server: fetching user profile...');

  setTimeout(() => {
    // Simulated condition for success or failure.
    const isServerOnline = true;

    if (isServerOnline) {
      // Resolves the promise with the requested data.
      resolve({ id: 101, username: 'Majed_IQ', role: 'Developer' });
      return;
    }

    // Rejects the promise if an error occurs.
    reject(new Error('Server is offline or connection timed out.'));
  }, 2000);
});

console.log('App: starting request...');

// Handling the promise outcome.
fetchUserProfile
  .then((data) => {
    // Executed upon successful resolution.
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
    return;
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
