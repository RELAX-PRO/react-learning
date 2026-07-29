import React from 'react';

// This forces Next.js to dynamically render this page on EVERY request.
// It acts as Server Side Rendering (SSR).
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // This fetch will run on the server every single time a user visits the page.
  // We simulate fetching real-time clinic stats (e.g., number of waiting patients).
  
  // Note: Since we don't have a real API running, we just generate a random number 
  // to prove the page re-renders dynamically!
  const waitingPatients = Math.floor(Math.random() * 20);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white font-mono">
      <h1 className="text-3xl text-rose-400 font-bold mb-6">🩺 Live Clinic Dashboard</h1>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl max-w-sm">
        <p className="text-slate-400 mb-2">Patients in Waiting Room:</p>
        <p className="text-5xl text-emerald-400 font-black mb-4">{waitingPatients}</p>
        
        <div className="text-xs text-slate-500 bg-slate-950 p-2 rounded">
          Last Updated: {currentTime}
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 max-w-md leading-relaxed">
        Because we exported <code className="text-pink-400">force-dynamic</code>, this page is fully 
        <strong className="text-white"> Server Side Rendered (SSR)</strong>. 
        It is rebuilt by the server on every single page refresh, guaranteeing real-time data!
      </p>
    </div>
  );
}
