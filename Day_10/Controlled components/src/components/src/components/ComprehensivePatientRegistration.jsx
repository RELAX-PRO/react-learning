// =========================================================================
// File: src/components/ComprehensivePatientRegistration.jsx
// Description: Multi-field form managed by a SINGLE unified state object
// =========================================================================
import React, { useState } from 'react';

export const ComprehensivePatientRegistration = () => {
  // 1. Single unified state object holding all patient data fields:
  const [patientData, setPatientData] = useState({
    fullName: "",
    phoneNumber: "",
    age: "",
    address: ""
  });

  // 2. The Universal Change Handler (One engine to rule them all! 🪄):
  const handleInputChange = (e) => {
    // Destructure name and value directly from the input target:
    const { name, value } = e.target;

    // Use ES6 Computed Property Names [name] with the Spread Operator:
    setPatientData((prevData) => ({
      ...prevData,      // 1st: Keep all existing fields untouched
      [name]: value     // 2nd: Overwrite ONLY the field that just triggered the event
    }));
  };

  // 3. Reset all fields instantly with a single empty object:
  const handleResetForm = () => {
    setPatientData({
      fullName: "",
      phoneNumber: "",
      age: "",
      address: ""
    });
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-lg mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🏥 Comprehensive Patient Portal</h2>

      <div className="space-y-4">
        {/* --- FIELD 1: FULL NAME --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Full Name:</label>
          <input
            type="text"
            name="fullName"                  // 👈 STRICT MUST: Matches the object key exact string
            value={patientData.fullName}     // 👈 Reads from the unified object
            onChange={handleInputChange}     // 👈 Calls the Universal Handler
            placeholder="e.g. Ahmed Mahmoud"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 2: PHONE NUMBER --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"               // 👈 Dynamic Key Target
            value={patientData.phoneNumber}
            onChange={handleInputChange}
            placeholder="07900000000"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 3: AGE --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Age:</label>
          <input
            type="number"
            name="age"                       // 👈 Dynamic Key Target
            value={patientData.age}
            onChange={handleInputChange}
            placeholder="e.g. 35"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 4: ADDRESS --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Residential Address:</label>
          <input
            type="text"
            name="address"                   // 👈 Dynamic Key Target
            value={patientData.address}
            onChange={handleInputChange}
            placeholder="City, District, Street..."
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* --- LIVE STATE DEBUGGER (Enterprise Visibility) --- */}
      <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-dashed border-slate-700">
        <span className="text-[10px] text-amber-400 font-bold block mb-1">⚡ LIVE UNIFIED STATE OBJECT:</span>
        <pre className="text-xs text-emerald-400 overflow-x-auto leading-relaxed">
          {JSON.stringify(patientData, null, 2)}
        </pre>
      </div>

      {/* --- FORM ACTIONS --- */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleResetForm}
          className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-xs text-slate-300 transition cursor-pointer"
        >
          🗑️ Clear All
        </button>
        <button
          disabled={!patientData.fullName || !patientData.phoneNumber}
          className="w-2/3 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold text-sm transition cursor-pointer"
        >
          ✅ Save Patient Record
        </button>
      </div>
    </div>
  );
};