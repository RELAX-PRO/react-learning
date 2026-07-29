"use client"; // 🔥 THE MAGIC DIRECTIVE!

import React, { useState } from 'react';

// Because we added "use client" at the very top of the file,
// Next.js knows that this component requires interactivity and must be shipped to the browser.
export function SearchPatientInput() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // This alert relies on the browser's window object.
    // It would crash a Server Component, but it works perfectly here!
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <h3 className="text-cyan-400 font-bold mb-2">🔍 Interactive Search</h3>
      <p className="text-xs text-slate-400 mb-4">
        This is a Client Component because it needs `useState` and an `onClick` event.
      </p>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Patient Name..."
          className="flex-1 p-2 bg-slate-950 border border-slate-700 rounded text-sm outline-none focus:border-emerald-500"
        />
        <button 
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded font-bold transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}
