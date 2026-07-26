// =========================================================================
// File: src/components/UncontrolledPatientSearch.jsx
// Description: Zero Re-render Form using useRef (Uncontrolled Architecture)
// =========================================================================
import React, { useRef } from 'react';

export const UncontrolledPatientSearch = () => {
  // Refs point directly to DOM inputs without using React state for every keystroke.
  const patientIdRef = useRef(null);
  const searchReasonRef = useRef(null);

  // Read the values only when the form is submitted.
  const handleSearchSubmit = (e) => {
    // Prevent the browser from reloading the page.
    e.preventDefault();

    // Read the live values from the DOM at submit time.
    const enteredId = patientIdRef.current.value;
    const enteredReason = searchReasonRef.current.value;

    // Log the collected values to prove the ref-based approach works.
    console.log('Read values directly from the DOM:');
    console.log({ id: enteredId, reason: enteredReason });

    // Submit to an API here when the lesson becomes connected to a backend.
    // axios.post('/api/search', { id: enteredId, reason: enteredReason });
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 Quick Search (Uncontrolled)</h2>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* --- FIELD 1: UNCONTROLLED PATIENT ID --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">رقم ملف المريض:</label>
          <input
            type="text"
            ref={patientIdRef}          // Attach the DOM node to the ref.
            defaultValue="ID-"          // Uncontrolled inputs use defaultValue.
            placeholder="مثال: ID-9842"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 2: UNCONTROLLED REASON --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">سبب الاستعلام السريع:</label>
          <input
            type="text"
            ref={searchReasonRef}       // Attach the DOM node to the second ref.
            placeholder="مثال: مراجعة قياس النظر..."
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-sm transition cursor-pointer text-slate-950"
        >
          🚀 بحث فوري (بدون Re-render)
        </button>
      </form>
    </div>
  );
};