// =========================================================================
// File: src/components/PatientIntakeForm.jsx
// Description: Fully Controlled Components with Real-time Validation
// =========================================================================
import React, { useState } from 'react';

export const PatientIntakeForm = () => {
  // 1. Single Source of Truth initialized with clean empty strings:
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spherePower, setSpherePower] = useState("");

  // 2. Controlled Handler: Prevent numbers in patient names instantly!
  const handleNameChange = (e) => {
    const rawInput = e.target.value;
    // Strip out any numeric digits automatically as the user types:
    const cleanText = rawInput.replace(/[0-9]/g, '');
    setPatientName(cleanText);
  };

  // 3. Controlled Handler: Allow ONLY numbers and limit length to 11 digits!
  const handlePhoneChange = (e) => {
    const rawInput = e.target.value;
    const onlyNumbers = rawInput.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-cyan-400 mb-6">👁️ Patient Intake Portal</h2>

      {/* --- FIELD 1: CONTROLLED NAME INPUT --- */}
      <div className="mb-4">
        <label className="block text-xs text-slate-400 mb-1">Patient Full Name (No Numbers Allowed):</label>
        <input
          type="text"
          value={patientName}        // 👈 Controlled by React State
          onChange={handleNameChange} // 👈 Real-time Sanitization
          placeholder="e.g. John Doe"
          className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
        />
        <span className="text-[10px] text-emerald-400 mt-1 block">
          Current State Value: "{patientName}"
        </span>
      </div>

      {/* --- FIELD 2: CONTROLLED PHONE INPUT --- */}
      <div className="mb-6">
        <label className="block text-xs text-slate-400 mb-1">Phone Number (11 Digits Max):</label>
        <input
          type="text"
          value={phoneNumber}              // 👈 Controlled by React State
          onChange={handlePhoneChange}     // 👈 Filters letters instantly
          placeholder="07900000000"
          className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
        />
        <span className="text-[10px] text-slate-500 block mt-1">
          Digits entered: {phoneNumber.length} / 11
        </span>
      </div>

      {/* --- CONDITIONAL UI: Button disables itself if form is invalid! --- */}
      <button
        disabled={patientName.length < 3 || phoneNumber.length !== 11}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold transition cursor-pointer"
      >
        Save Patient Record
      </button>
    </div>
  );
};