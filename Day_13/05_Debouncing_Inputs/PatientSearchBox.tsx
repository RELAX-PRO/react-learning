// =========================================================================
// File: src/components/PatientSearchBox.tsx
// Description: Implementing debounced search to protect the DB
// =========================================================================
import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const PatientSearchBox = () => {
  // 1. Instant value (updates with every keystroke so the user sees what they type immediately)
  const [instantSearch, setInstantSearch] = useState("");

  // 2. Debounced value (updates ONLY after the user stops typing for 600ms)
  const debouncedSearch = useDebounce(instantSearch, 600);

  // 3. Watch the debounced value to send it to the server
  useEffect(() => {
    // If empty, do not search
    if (!debouncedSearch) return;

    // The actual database connection happens here.. This will only occur ONCE!
    console.log(`📡 [API Call]: Searching the database for: ${debouncedSearch}`);
  }, [debouncedSearch]); 

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <h3 className="text-cyan-400 font-bold mb-2">🔍 Safe Patient Search</h3>
      <input
        type="text"
        value={instantSearch}
        onChange={(e) => setInstantSearch(e.target.value)}
        placeholder="Type patient name..."
        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs focus:border-cyan-500 outline-none"
      />
      <div className="mt-4 text-xs text-slate-400">
        <p>The UI currently sees: <span className="text-amber-400">{instantSearch}</span></p>
        <p>The Server will receive: <span className="text-emerald-400">{debouncedSearch}</span></p>
      </div>
    </div>
  );
};