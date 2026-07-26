import React, { useState } from 'react';

/**
 * Example 1: Basic Controlled Components
 * 
 * In this example, we control individual input fields using separate state variables.
 * This is perfect for small forms. We also demonstrate "Real-time Validation"
 * by preventing the user from typing invalid characters.
 */
export const PatientIntakeForm = () => {
  // 1. Initialize state to store the controlled values
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 2. Controlled Handler: Prevent numbers in patient names immediately.
  const handleNameChange = (e) => {
    const rawInput = e.target.value;
    // Strip out any numeric digits automatically as the user types:
    const cleanText = rawInput.replace(/[0-9]/g, '');
    setPatientName(cleanText);
  };

  // 3. Controlled Handler: Restrict to numeric input and enforce maximum length.
  const handlePhoneChange = (e) => {
    const rawInput = e.target.value;
    // Strip out any non-numeric characters:
    const onlyNumbers = rawInput.replace(/[^0-9]/g, '');
    
    // Only update state if the length is 11 or less
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  // Check if form is valid to enable/disable the submit button
  const isFormValid = patientName.length >= 3 && phoneNumber.length === 11;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-cyan-400 mb-6">🩺 Patient Intake Portal</h2>

      {/* --- FIELD 1: CONTROLLED NAME INPUT --- */}
      <div className="mb-4">
        <label className="block text-xs text-slate-400 mb-1">Patient Full Name (No Numbers Allowed):</label>
        <input
          type="text"
          value={patientName}         // Controlled by React State
          onChange={handleNameChange} // Real-time Sanitization
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
          value={phoneNumber}          // Controlled by React State
          onChange={handlePhoneChange} // Filters letters instantly
          placeholder="07900000000"
          className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-cyan-500 focus:outline-none"
        />
        <span className="text-[10px] text-slate-500 block mt-1">
          Digits entered: {phoneNumber.length} / 11
        </span>
      </div>

      {/* --- CONDITIONAL UI: Button disables itself if form is invalid --- */}
      <button
        disabled={!isFormValid}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold transition cursor-pointer disabled:cursor-not-allowed"
      >
        Save Patient Record
      </button>
    </div>
  );
};
