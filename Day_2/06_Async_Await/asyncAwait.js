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

  getUserFromAPI().then((userData) => {
    console.log('User received:', userData.username);
  });
};

// Using async/await for cleaner asynchronous code flow.
const loadUserModernWay = async () => {
  console.log('Fetching user (async/await)...');

  // 'await' suspends execution of this function until the Promise resolves.
  const userData = await getUserFromAPI();
  console.log('User received:', userData.username);
};

loadUserModernWay();

// Managing asynchronous operations using try/catch for robust error handling.
const fetchDashboardData = async () => {
  console.log('UI: Show loading indicator');

  try {
    // Attempting the asynchronous network request.
    console.log('Network: Contacting server...');
    const response = await getUserFromAPI();

    console.log('Success: Data loaded!', response);
    console.log(`Welcome to your dashboard, ${response.username}!`);
  } catch (error) {
    // Handling rejected promises or thrown errors.
    console.error('Error: Failed to fetch dashboard data.', error);
    console.log('UI: Show error state');
  } finally {
    // Performing cleanup operations unconditionally.
    console.log('UI: Hide loading indicator');
  }
};

fetchDashboardData();
