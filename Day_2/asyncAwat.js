// A ready-made Promise that simulates fetching user details from an API after 2 seconds:
const getUserFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: "Majed_IQ", role: "React Engineer" });
    }, 2000);
  });
};

// --- 1. THE OLD WAY (Using .then chains) ---
const loadUserOldWay = () => {
  console.log("Old Way: Fetching user...");
  
  getUserFromAPI().then((userData) => {
    // Notice how we are inside a nested callback function!
    console.log("Old Way: User received:", userData.username);
  });
};

// --- 2. THE MODERN WAY (Using Async / Await) ---
// Notice the 'async' keyword before the arrow () =>
const loadUserModernWay = async () => {
  console.log("Modern Way: Fetching user...");
  
  // Notice the 'await' keyword! It PAUSES here for 2 seconds, extracts the real data,
  // and puts it cleanly into the 'userData' variable without any callbacks or .then()!
  const userData = await getUserFromAPI();
  
  // This line only runs AFTER the promise is 100% resolved!
  console.log("Modern Way: User received:", userData.username);
};

// loadUserModernWay();


// A real-world pattern for fetching data cleanly and safely in React:
const fetchDashboardData = async () => {
  console.log("UI: Show Loading Spinner 🌀");

  try {
    // 1. Try to pause and wait for the API response
    console.log("Network: Contacting server...");
    const response = await getUserFromAPI(); 
    
    // 2. If successful, update our React UI with the real data!
    console.log("SUCCESS: Data loaded!", response);
    console.log(`Welcome to your dashboard, ${response.username}!`);

  } catch (error) {
    // 3. If any Promise gets rejected or Wi-Fi drops, jump here immediately!
    console.error("ERROR CAUGHT: Could not fetch dashboard data.", error);
    console.log("UI: Show Error Banner 🚨");

  } finally {
    // 4. Regardless of success or failure, always hide the spinner at the end
    console.log("UI: Hide Loading Spinner 🛑");
  }
};
fetchDashboardData();




const updateCurrencyUI = () => {
  console.log("Starting update...");

  fetchCurrencyRate("USD")
    .then((rate) => {
      console.log("New rate fetched: " + rate);
      return calculateTax(rate);
    })
    .then((taxedAmount) => {
      console.log("Final price with tax: " + taxedAmount);
    })
    .catch((err) => {
      console.log("Error updating currency: " + err);
    })
    .finally(() => {
      console.log("Update process finished.");
    });
};
const updateCurrencyUIAsync = async () => {
  console.log("Starting update...");
  const rate = await fetchCurrencyRate("USD");
  const taxedAmount = await calculateTax(rate);
  try {
    console.log("New rate fetched: " + rate);
    console.log("Final price with tax: " + taxedAmount);
  } catch (err) {
    console.log("Error updating currency: " + err);
  } finally {
    console.log("Update process finished.");
  }
};