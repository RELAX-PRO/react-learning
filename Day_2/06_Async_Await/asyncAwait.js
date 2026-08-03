/*
  =========================================
  ASYNC/AWAIT MECHANICS
  =========================================
  `async` and `await` are syntactic sugar over JavaScript Promises and Generators. 
  They allow you to write asynchronous code that looks and behaves like synchronous code.
  
  When you declare a function as `async`, it automatically wraps its return value 
  in a Promise.
  When you use `await` inside an `async` function, it pauses the execution of 
  that specific function until the awaited Promise settles. While paused, the 
  JavaScript engine can execute other synchronous code outside this function.
*/

// Returning a Promise to simulate an asynchronous API call.
const getUserFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: 'Majed_IQ', role: 'React Engineer' });
    }, 2000);
  });
};

// Traditional Promise chaining.
const loadUserOldWay = () => {
  console.log('Fetching user (Promise chaining)...');

  getUserFromAPI().then((userData) => { // Callback based syntax
    console.log('User received:', userData.username);
  });
};

// Using async/await for cleaner asynchronous code flow.
// The `async` keyword indicates this function handles asynchronous operations.
const loadUserModernWay = async () => {
  console.log('Fetching user (async/await)...');

  // 'await' suspends execution of this function until the Promise resolves.
  // The resolved value of the Promise is assigned to `userData`.
  const userData = await getUserFromAPI(); // Yields control back to the event loop while waiting
  
  // This line runs as a microtask after the promise resolves
  console.log('User received:', userData.username); 
};

loadUserModernWay();

// Managing asynchronous operations using try/catch for robust error handling.
const fetchDashboardData = async () => {
  console.log('UI: Show loading indicator');

  /*
    TRY/CATCH WITH ASYNC/AWAIT:
    Because async/await pauses execution, we can use traditional synchronous 
    try/catch blocks to handle both synchronous errors and Promise rejections.
  */
  try {
    // Attempting the asynchronous network request.
    console.log('Network: Contacting server...');
    const response = await getUserFromAPI(); // If this Promise rejects, it throws an error that the catch block handles

    console.log('Success: Data loaded!', response);
    console.log(`Welcome to your dashboard, ${response.username}!`);
  } catch (error) {
    // Handling rejected promises or thrown errors.
    console.error('Error: Failed to fetch dashboard data.', error);
    console.log('UI: Show error state');
  } finally {
    // Performing cleanup operations unconditionally.
    console.log('UI: Hide loading indicator'); // Executes whether try succeeded or catch executed
  }
};

fetchDashboardData();
