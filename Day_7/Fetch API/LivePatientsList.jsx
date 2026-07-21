// =========================================================================
// File: LivePatientsList.jsx (Real-world Data Fetching in React)
// =========================================================================
import React, { useState, useEffect } from 'react';

const LivePatientsList = () => {
  // 1. State for holding the server data (starts as an empty array)
  const [patients, setPatients] = useState([]);
  
  // 2. State for UI feedback (shows a loading screen while internet connects)
  const [isLoading, setIsLoading] = useState(true);

  // 3. useEffect triggers the fetch exactly ONCE when the component mounts
  useEffect(() => {
    const getPatientsFromServer = async () => {
      try {
        setIsLoading(true); // Turn on loading spinner
        
        // Calling our API endpoint (Simulated URL):
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Save the unpacked data into our React State memory:
        setPatients(data);
      } catch (error) {
        console.error("Network Error: Could not reach the clinic server!", error);
      } finally {
        setIsLoading(false); // Turn off loading spinner whether it succeeded or failed
      }
    };

    getPatientsFromServer();
  }, []); // Empty dependency array = run only once on screen opening!

  // 4. Conditional Rendering: What the user sees while waiting for the network
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-slate-900 rounded-2xl border border-slate-800 text-blue-400 font-mono">
        <p className="animate-pulse text-lg">⏳ Fetching optical records from vault...</p>
      </div>
    );
  }

  // 5. Render the real data once the mailman arrives!
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        👁️ Active Clinic Patients ({patients.length})
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
            
            <p className="text-xs text-slate-400 mt-2">📧 Email: {patient.email}</p>
            <p className="text-xs text-slate-400">🏙️ City: {patient.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePatientsList;    