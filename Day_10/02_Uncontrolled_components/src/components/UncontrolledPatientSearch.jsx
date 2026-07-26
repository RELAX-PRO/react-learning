import React, { useRef } from 'react';

/**
 * Example 1: Uncontrolled Components using useRef
 * 
 * In uncontrolled components, we do NOT use React state to store the input value.
 * Instead, we use a 'ref' to point directly to the HTML DOM element, and we 
 * pull the value out ONLY when the form is submitted.
 * 
 * Pro: Zero re-renders while typing.
 * Con: Cannot do real-time validation or masking as they type.
 */
export const UncontrolledPatientSearch = () => {
  // 1. Create refs to point to the DOM inputs
  const patientIdRef = useRef(null);
  const searchReasonRef = useRef(null);

  // 2. Read the values ONLY when the form is submitted
  const handleSearchSubmit = (e) => {
    // Prevent the browser from refreshing the page
    e.preventDefault();

    // Pull the live values directly from the DOM using `.current.value`
    const enteredId = patientIdRef.current.value;
    const enteredReason = searchReasonRef.current.value;

    console.log('Form Submitted! Values read directly from the DOM:');
    console.log({ id: enteredId, reason: enteredReason });

    // In a real app, you would send this to an API:
    // fetch('/api/search', { body: JSON.stringify({ enteredId, enteredReason }) })
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 Quick Patient Search (Uncontrolled)</h2>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* --- FIELD 1: UNCONTROLLED PATIENT ID --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient File ID:</label>
          <input
            type="text"
            ref={patientIdRef}          // Attach the DOM node to the ref
            defaultValue="ID-"          // Uncontrolled inputs use defaultValue, NOT value!
            placeholder="e.g. ID-9842"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 2: UNCONTROLLED REASON --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Reason for Search:</label>
          <input
            type="text"
            ref={searchReasonRef}       // Attach the DOM node to the second ref
            placeholder="e.g. Vision checkup..."
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-sm transition cursor-pointer text-slate-950"
        >
          🚀 Search Immediately (Zero Re-renders)
        </button>
      </form>
    </div>
  );
};
