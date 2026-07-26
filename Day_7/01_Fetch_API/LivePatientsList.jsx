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

  // useEffect triggers the fetch once when the component mounts.
  // The empty dependency array [] ensures this effect does not re-run.
  useEffect(() => {
    const getPatientsFromServer = async () => {
      try {
        setIsLoading(true); 
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        setPatients(data);
      } catch (error) {
        console.error("Network Error: Could not reach the server.", error);
      } finally {
        setIsLoading(false); 
      }
    };

    getPatientsFromServer();
  }, []); 

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