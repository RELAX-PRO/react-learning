import React from 'react';

/**
 * ==========================================
 * DATA FETCHING PATTERNS MECHANICS
 * ==========================================
 * When building React Server Components, we often need to fetch data from multiple sources.
 * Fetching sequentially (waiting for one request to finish before starting the next) can create 
 * "waterfalls" and significantly degrade performance.
 * 
 * Using `Promise.all` allows us to initiate multiple asynchronous requests concurrently.
 * The component will only pause rendering until all promises in the array have resolved,
 * drastically reducing the total time taken to fetch data.
 */

// Simulated database queries
const fetchPatientProfile = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Takes 2 seconds
  return { id, name: "Ahmed", age: 45 };
};

const fetchPatientMedicalHistory = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Takes 2 seconds
  return [{ date: "2023-01-15", diagnosis: "Myopia" }];
};

export default async function PatientDashboard() {
  const patientId = "123";

  // ❌ BAD PATTERN (Sequential Fetching):
  // const profile = await fetchPatientProfile(patientId); // Waits 2s
  // const history = await fetchPatientMedicalHistory(patientId); // Waits ANOTHER 2s
  // Total wait time: 4 seconds!

  // ✅ GOOD PATTERN (Parallel Fetching):
  // We kick off both requests at the same time, and wait for BOTH to finish.
  // Total wait time: 2 seconds!
  const [profile, history] = await Promise.all([
    fetchPatientProfile(patientId),
    fetchPatientMedicalHistory(patientId)
  ]);

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white font-mono">
      <h1 className="text-3xl text-cyan-400 font-bold mb-6">Patient Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl text-emerald-400 mb-2">Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Age: {profile.age}</p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl text-amber-400 mb-2">Medical History</h2>
          <ul>
            {history.map((record, i) => (
              <li key={i}>{record.date} - {record.diagnosis}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-400">
        Notice how fast this dashboard loads! By using <code className="text-pink-400">Promise.all()</code>, 
        we fetch the Profile and the Medical History in parallel on the server.
      </p>
    </div>
  );
}
