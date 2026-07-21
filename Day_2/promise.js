// Creating a Promise that simulates fetching user data from a server:
const fetchUserProfile = new Promise((resolve, reject) => {
  console.log("Server: Fetching data in progress...");
  
  // We use setTimeout to simulate a real server delay (e.g., 2 seconds)
  setTimeout(() => {
    const isServerOnline = true; // Change this to false to simulate an error!
    
    if (isServerOnline) {
      // 1. If operation is successful, we call resolve() and pass the data:
      const userData = { id: 101, username: "Majed_IQ", role: "Developer" };
      resolve(userData);
    } else {
      // 2. If operation fails, we call reject() and pass an error message:
      reject("ERROR: Server is offline or connection timed out!");
    }
  }, 2000);
});


// Consuming the Promise using .then(), .catch(), and .finally():
console.log("App: Starting request...");

fetchUserProfile
  .then((data) => {
    // This runs ONLY if resolve() was called inside the promise
    console.log("SUCCESS: Data received successfully!", data);
    console.log(`Welcome back, ${data.username}!`);
  })
  .catch((errorMessage) => {
    // This runs ONLY if reject() was called inside the promise
    console.error("FAILED: Could not load profile.", errorMessage);
  })
  .finally(() => {
    // This runs NO MATTER WHAT at the very end
    console.log("App: Request cycle completed (Hide loading spinner).");
  });

console.log("App: This line runs immediately while waiting for the promise!\n");



const checkInventory = new Promise((resolve, reject) => {
  const itemInStock = false; // Note: this is FALSE!

  if (itemInStock) {
    resolve("Item is available! Proceeding to checkout.");
  } else {
    reject("Out of stock! Cannot complete purchase.");
  }
});

checkInventory
  .then((message) => {
    console.log("THEN: " + message);
  })
  .catch((error) => {
    console.log("CATCH: " + error);
  })
  .finally(() => {
    console.log("FINALLY: Inventory check finished.");
  });
