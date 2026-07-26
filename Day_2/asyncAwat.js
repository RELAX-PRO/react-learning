// Start with a Promise so the async/await example has something real to wait for.
const getUserFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: 'Majed_IQ', role: 'React Engineer' });
    }, 2000);
  });
};

// The old way: promise chaining.
const loadUserOldWay = () => {
  console.log('Old way: fetching user...');

  getUserFromAPI().then((userData) => {
    console.log('Old way: user received:', userData.username);
  });
};

// The modern way: async / await keeps the code readable from top to bottom.
const loadUserModernWay = async () => {
  console.log('Modern way: fetching user...');

  // await pauses this function until the Promise resolves.
  const userData = await getUserFromAPI();
  console.log('Modern way: user received:', userData.username);
};

// Run the example so the difference is visible in the console.
loadUserModernWay();

// Real-world pattern: wrap awaited work in try/catch/finally.
const fetchDashboardData = async () => {
  console.log('UI: show loading spinner 🌀');

  try {
    // The request lives inside the try block because it may fail.
    console.log('Network: contacting server...');
    const response = await getUserFromAPI();

    console.log('SUCCESS: data loaded!', response);
    console.log(`Welcome to your dashboard, ${response.username}!`);
  } catch (error) {
    // Any thrown error or rejected Promise lands here.
    console.error('ERROR CAUGHT: could not fetch dashboard data.', error);
    console.log('UI: show error banner 🚨');
  } finally {
    // finally is perfect for cleanup, regardless of success or failure.
    console.log('UI: hide loading spinner 🛑');
  }
};

fetchDashboardData();