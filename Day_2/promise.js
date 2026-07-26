// A Promise represents a future result: success or failure.
const fetchUserProfile = new Promise((resolve, reject) => {
  // Simulate a server request.
  console.log('Server: fetching user profile...');

  setTimeout(() => {
    // This flag controls whether the promise resolves or rejects.
    const isServerOnline = true;

    if (isServerOnline) {
      // Success path: resolve with real data.
      resolve({ id: 101, username: 'Majed_IQ', role: 'Developer' });
      return;
    }

    // Failure path: reject with an Error object.
    reject(new Error('Server is offline or connection timed out.'));
  }, 2000);
});

// This line runs immediately; the promise is still pending.
console.log('App: starting request...');

fetchUserProfile
  .then((data) => {
    // Then runs only when the promise resolves.
    console.log('SUCCESS: data received successfully!', data);
    console.log(`Welcome back, ${data.username}!`);
  })
  .catch((error) => {
    // Catch runs only when the promise rejects.
    console.error('FAILED: could not load profile.', error.message);
  })
  .finally(() => {
    // Finally runs no matter what happened above.
    console.log('App: request cycle completed (hide loading spinner).');
  });

// This demonstrates that promises are asynchronous.
console.log('App: this line runs immediately while waiting for the promise!\n');

const checkInventory = new Promise((resolve, reject) => {
  // Set this to true to see the success path.
  const itemInStock = false;

  if (itemInStock) {
    // Resolve when the item is available.
    resolve('Item is available! Proceeding to checkout.');
    return;
  }

  // Reject when the item is out of stock.
  reject(new Error('Out of stock! Cannot complete purchase.'));
});

checkInventory
  .then((message) => {
    // The success handler receives the resolved message.
    console.log('THEN: ' + message);
  })
  .catch((error) => {
    // The error handler receives the rejection reason.
    console.log('CATCH: ' + error.message);
  })
  .finally(() => {
    // Cleanup or final UI changes can happen here.
    console.log('FINALLY: inventory check finished.');
  });
