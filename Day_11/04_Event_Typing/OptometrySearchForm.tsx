// =========================================================================
// File: src/components/OptometrySearchForm.tsx
// Description: Mastering React Event Typing in TypeScript
// =========================================================================
import React, { useState } from 'react';

export const OptometrySearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Typing an Input Change Event
  // We specify that 'e' is a ChangeEvent triggered by an HTMLInputElement
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // TS knows exactly that target has a .value!
  };

  // 2. Typing a Form Submit Event
  // We specify that 'e' is a FormEvent triggered by an HTMLFormElement
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TS allows preventDefault() because it exists on FormEvent
    console.log("Searching for patient:", searchQuery);
  };

  // 3. Typing a Button Click Event
  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-4 bg-slate-900 rounded-xl max-w-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search patient name..."
        className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white text-sm"
      />
      
      <div className="flex gap-2 mt-3">
        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded text-xs">
          Search
        </button>
        <button 
          type="button" 
          onClick={handleClearClick}
          className="bg-slate-800 text-slate-300 px-4 py-2 rounded text-xs"
        >
          Clear
        </button>
      </div>
    </form>
  );
};