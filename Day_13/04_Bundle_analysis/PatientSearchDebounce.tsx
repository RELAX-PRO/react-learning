// =========================================================================
// File: PatientSearchDebounce.tsx
// Description: Demonstrating Failed vs Successful Tree Shaking
// =========================================================================
import React, { useState, useEffect } from 'react';

// =========================================================================
// ❌ THE DISASTROUS IMPORT (Kills Tree Shaking):
// This single line drags the ENTIRE lodash library (approx 72 KB) 
// into your search screen bundle!
// =========================================================================
// import _ from 'lodash'; 
// const search = _.debounce(fetchPatient, 500);

// =========================================================================
// ✅ THE SURGICAL IMPORT (Tree-Shaking Friendly):
// This line tells the engine: "Go into the lodash folder, and grab 
// ONLY the debounce file!" (Weight: ~2 KB only!)
// =========================================================================
import debounce from 'lodash/debounce';

export const PatientSearchDebounce = () => {
  const [query, setQuery] = useState('');
  
  // A mock API fetch function
  const fetchPatient = (searchQuery: string) => {
    console.log(`🌐 Fetching patient records for: ${searchQuery}`);
  };

  // We wrap our fetch function in the surgical debounce function
  const debouncedSearch = React.useMemo(
    () => debounce(fetchPatient, 500),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
    
    // Cleanup the debounce timer on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white font-mono max-w-md">
      <h3 className="text-cyan-400 font-bold mb-4">🔍 Fast Patient Search</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type patient name..."
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:border-cyan-500 outline-none"
      />
      <p className="mt-4 text-xs text-slate-400">
        Notice how typing delays the network request by 500ms. 
        Thanks to Tree Shaking, this feature only cost us 2KB of bundle size instead of 72KB!
      </p>
    </div>
  );
};
