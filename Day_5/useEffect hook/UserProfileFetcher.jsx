// =========================================================================
// File: UserProfileFetcher.jsx (Safe API Fetching with useEffect)
// =========================================================================
import React, { useState, useEffect } from 'react';

const UserProfileFetcher = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🛡️ THE SANDBOX: This effect runs ONLY when the component mounts, 
  // OR if the parent changes the 'userId' prop!
  useEffect(() => {
    console.log(`🌐 Background Task: Fetching data for user ID: [${userId}]...`);
    setIsLoading(true);
    setError(null);

    // Simulating an API call with fetch:
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        setUserData(data);   // Save fetched data to state
        setIsLoading(false); // Turn off spinner
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

  }, [userId]); // <-- DEPENDENCY ARRAY: Re-run ONLY if userId changes!

  // 1. Render Loading Spinner first:
  if (isLoading) {
    return <div className="p-4 bg-slate-800 text-yellow-400 font-mono">⌛ Loading user profile...</div>;
  }

  // 2. Render Error message if fetch failed:
  if (error) {
    return <div className="p-4 bg-red-900 text-white font-mono">❌ Error: {error}</div>;
  }

  // 3. Render the fetched data safely:
  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg shadow-md font-mono">
      <h2 className="text-xl font-bold text-blue-400">👤 {userData.name}</h2>
      <p className="text-sm text-slate-300">📧 Email: {userData.email}</p>
      <p className="text-sm text-slate-300">🏢 Company: {userData.company.name}</p>
    </div>
  );
};

export default UserProfileFetcher;