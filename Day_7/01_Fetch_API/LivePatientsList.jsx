// =========================================================================
// File: LivePatientsList.jsx
// Description: Demonstrates data fetching in React using the native Fetch API.
// =========================================================================
import React, { useState, useEffect } from 'react';

const LivePatientsList = () => {
  // State for holding the server data (initialized as an empty array)
  const [patients, setPatients] = useState([]);
  
  // State for UI feedback (shows a loading state during data fetching)
  const [isLoading, setIsLoading] = useState(true);

  /**
   * ============================================================================
   * EXPLANATION: Data Fetching Lifecycle in React
   * ============================================================================
   * When fetching data inside a React component, we typically deal with three
   * core pieces of state: 
   * 1. The data itself (usually initialized as null or an empty array)
   * 2. A loading flag (true when the fetch starts, false when it ends)
   * 3. An error state (to catch and display any failures)
   * 
   * We use the `useEffect` hook to trigger the side-effect (fetching) as soon 
   * as the component mounts. The empty dependency array `[]` ensures the effect
   * runs only once. If we didn't use `useEffect` and just fetched in the component
   * body, it would fetch every time the component re-renders, causing an infinite loop.
   * ============================================================================
   */
  // useEffect triggers the fetch once when the component mounts.
  // The empty dependency array [] ensures this effect does not re-run.
  useEffect(() => {
    // Effect callbacks cannot be async, so we define an async function inside
    const getPatientsFromServer = async () => {
      try {
        // Explicitly set loading state before fetching
        setIsLoading(true); 
        
        // Await the fetch request
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // Await the JSON parsing of the response body
        const data = await response.json();
        
        // Update state with fetched data, triggering a re-render
        setPatients(data);
      } catch (error) {
        console.error("Network Error: Could not reach the server.", error);
      } finally {
        // finally block runs regardless of success or failure, ensuring we stop loading
        setIsLoading(false); 
      }
    };

    // Invoke the async function immediately
    getPatientsFromServer();
  }, []); // The empty array here is the dependency array

  // Conditional Rendering: Displays a loading state while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-slate-900 rounded-2xl border border-slate-800 text-blue-400 font-mono">
        <p className="animate-pulse text-lg">Fetching records...</p>
      </div>
    );
  }

  // Render the data once fetched successfully
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        Active Clinic Patients ({patients.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((patient) => (
          <div 
            key={patient.id} 
            className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-blue-500/50 transition-all shadow-md"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-slate-100">{patient.name}</h3>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                ID: #{patient.id}
              </span>
            </div>
            
            <p className="text-xs text-slate-400 mt-2">Email: {patient.email}</p>
            <p className="text-xs text-slate-400">City: {patient.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePatientsList;