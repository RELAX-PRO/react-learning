// Fetch API Example with Basic Error Handling
/**
 * ============================================================================
 * EXPLANATION: Fetch API & Promises
 * ============================================================================
 * The native `fetch` function is used to make HTTP requests. It returns a Promise 
 * that resolves to the Response object representing the response to the request.
 * Since it is promise-based, we can use async/await syntax to handle the asynchronous
 * nature of the network request, pausing execution until the Promise settles.
 * 
 * Crucially, `fetch` only rejects a promise when a network error occurs (like
 * the user being offline). It does NOT reject on HTTP errors (like 404 or 500).
 * Therefore, we must manually check `response.ok` (which is true for 2xx status
 * codes) and throw an error ourselves if the request failed at the server level.
 * ============================================================================
 */
const fetchPatientsData = async () => {
  try {
    // Initiate the network request and wait for the response header
    const response = await fetch('https://api.optical-clinic.com/v1/patients');

    // response.ok is a boolean indicating if the status is in the 200-299 range
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // response.json() reads the response stream to completion and parses it as JSON
    const data = await response.json();
    console.log('Patients List from Server:', data);
    return data;
  } catch (error) {
    // Handles both network errors (from fetch) and thrown HTTP errors (from !response.ok)
    console.error('Failed to load patients data:', error.message);
    return [];
  }
};