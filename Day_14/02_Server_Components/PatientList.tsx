import React from 'react';

/**
 * ==========================================
 * REACT SERVER COMPONENTS (RSC) MECHANICS
 * ==========================================
 * Server Components run entirely on the server and are never shipped to the client's browser.
 * This architecture significantly reduces the JavaScript bundle size.
 * 
 * Benefits of Server Components:
 * 1. Direct Backend Access: Securely connect to databases or APIs without exposing secrets.
 * 2. Zero Client JS: The component is rendered to static HTML before being sent to the browser.
 * 3. Simplified Data Fetching: No need for `useEffect`, `useState`, or external libraries for simple data fetching.
 */

// Notice there is NO "use client" at the top.
// By default, ALL components in Next.js App Router are Server Components!

export default async function PatientList() {
  // 🤯 MIND BLOWING FEATURE: 
  // We can write async/await directly in the React component!
  // We can fetch data directly from our database here. No useEffect needed!
  
  // This code runs on the SERVER. It never reaches the browser.
  console.log("This will print in your terminal, NOT in the browser console!");

  // Simulating a fast database query
  // Since this component is executed on the server, this data could easily come directly from a SQL query or a direct API call.
  const patients = [
    { id: 1, name: "Ahmed", lastVisit: "2023-10-01" },
    { id: 2, name: "Sarah", lastVisit: "2023-11-15" }
  ];

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white font-mono max-w-md">
      <h3 className="text-cyan-400 font-bold mb-4">🏥 Server-Side Patient List</h3>
      <p className="text-xs text-slate-400 mb-4">
        This HTML was fully generated on the server and sent to the browser ready to be viewed.
        Zero JavaScript was shipped to the client to render this list!
      </p>
      
      <ul className="space-y-2">
        {patients.map(p => (
          <li key={p.id} className="bg-slate-800 p-3 rounded flex justify-between">
            <span className="font-bold text-emerald-400">{p.name}</span>
            <span className="text-slate-500 text-xs">Last Visit: {p.lastVisit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
