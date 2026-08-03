/**
 * ============================================================================
 * BLOCK COMMENT: Safe API Fetching with useEffect
 * ============================================================================
 * This component demonstrates fetching data asynchronously when a component mounts
 * or when its props (userId) change.
 * 
 * 1. STATE MANAGEMENT: We use multiple `useState` hooks to manage the fetched data,
 *    loading status, and any potential errors.
 * 2. THE EFFECT: `useEffect` wraps the asynchronous `fetch` call. It allows us to
 *    interact with the external API outside the normal render flow.
 * 3. DEPENDENCY ARRAY `[userId]`: This array tells React exactly when to re-run the effect.
 *    If `userId` changes, the effect runs again. If we passed `[]`, it would only run
 *    once on mount. If we passed nothing, it would run after EVERY render (which is bad).
 * ============================================================================
 */

// =========================================================================
// File: UserProfileFetcher.jsx (Safe API Fetching with useEffect)
// =========================================================================
import React, { useState, useEffect } from 'react';

const UserProfileFetcher = ({ userId }) => {
  // State to store the actual fetched user data
  const [userData, setUserData] = useState(null);
  
  // State to track if the network request is still pending
  const [isLoading, setIsLoading] = useState(true);
  
  // State to store any error messages from the request
  const [error, setError] = useState(null);

  //  Effect boundary: This effect runs ONLY when the component mounts, 
  // OR if the parent changes the 'userId' prop!
  useEffect(() => {
    console.log(` Background Task: Fetching data for user ID: [${userId}]...`);
    
    // Reset state before starting a new fetch
    setIsLoading(true);
    setError(null);

    // Simulating an API call with fetch:
    // fetch() returns a Promise representing the eventual network response
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        // response.ok is true if the HTTP status code is 200-299
        if (!response.ok) throw new Error("Network response was not ok");
        
        // Parse the JSON body. This also returns a Promise.
        return response.json();
      })
      .then(data => {
        setUserData(data);   // Save fetched data to state
        setIsLoading(false); // Turn off spinner (data is ready)
      })
      .catch(err => {
        // If there's a network error or JSON parsing error, it falls here
        setError(err.message);
        setIsLoading(false); // Turn off spinner even if there's an error
      });

  }, [userId]); // <-- DEPENDENCY ARRAY: Re-run ONLY if userId changes!

  // 1. Render Loading Spinner first:
  // If we are still waiting for the API, return this UI early
  if (isLoading) {
    return <div className="p-4 bg-slate-800 text-yellow-400 font-mono"> Loading user profile...</div>;
  }

  // 2. Render Error message if fetch failed:
  // If the error state was populated in the .catch block, return this UI
  if (error) {
    return <div className="p-4 bg-red-900 text-white font-mono"> Error: {error}</div>;
  }

  // 3. Render the fetched data safely:
  // By this point, isLoading is false and error is null, so userData must be populated
  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg shadow-md font-mono">
      <h2 className="text-xl font-bold text-blue-400"> {userData.name}</h2>
      <p className="text-sm text-slate-300"> Email: {userData.email}</p>
      {/* userData.company.name is safe to access because we verified data exists */}
      <p className="text-sm text-slate-300"> Company: {userData.company.name}</p>
    </div>
  );
};

export default UserProfileFetcher;