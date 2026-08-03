// =========================================================================
// File: src/components/OptometryMaskedInputs.jsx
// Description: Manual Input Masking in React without external libraries
// =========================================================================
import React, { useState } from 'react';

/**
 * OptometryMaskedInputs Component
 * 
 * This component demonstrates how to manually implement input masking 
 * (forcing a specific format onto user input) in React without relying 
 * on external libraries. It utilizes controlled inputs where the state 
 * drives the input value, and onChange handlers intercept, clean, and 
 * format the raw user input before updating the state.
 */
export const OptometryMaskedInputs = () => {
  // State to hold the formatted phone number value
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // State to hold the formatted serial code value
  const [frameSerial, setFrameSerial] = useState("");

  /**
   * handlePhoneMask
   * 
   * Intercepts the user's keystrokes for the phone number field.
   * It enforces the format: XXXX-XXX-XXXX (e.g., 0790-123-4567).
   * 
   * The mechanics involve:
   * 1. Extracting only the digits from the current input string.
   * 2. Slicing the string to prevent it from exceeding the maximum length (11 digits).
   * 3. Constructing a new string by inserting dashes at the appropriate positions 
   *    based on how many digits have been entered so far.
   */
  // 1. Iraqi Phone Number Mask (Example: 0790-123-4567)
  const handlePhoneMask = (e) => {
    // A: Clean the input by removing any non-digit characters
    // \D is a regex metacharacter matching any non-digit. The 'g' flag means global (replace all matches).
    const rawDigits = e.target.value.replace(/\D/g, '');

    // B: Prevent input from exceeding 11 digits
    // slice(0, 11) extracts from index 0 up to (but not including) index 11.
    const trimmed = rawDigits.slice(0, 11);

    // C: Dynamically format the string based on its length
    let formatted = trimmed;
    if (trimmed.length > 7) {
      // After the 7th digit: 0790-123-4567
      // We use template literals to construct the formatted string with dashes.
      // slice(0, 4) gets the first 4 digits, slice(4, 7) gets the next 3, slice(7) gets the rest.
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 4) {
      // After the 4th digit: 0790-123
      // When the user has entered between 5 and 7 digits, we only need one dash.
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4)}`;
    }

    // Update the component's state with the fully formatted string, which updates the UI.
    setPhoneNumber(formatted);
  };

  /**
   * handleSerialMask
   * 
   * Intercepts the user's keystrokes for the frame serial field.
   * It enforces the format: XXX-XXXX-XXXX (e.g., OPT-2026-8842).
   * 
   * The mechanics involve:
   * 1. Extracting only alphanumeric characters and immediately casting them to uppercase.
   * 2. Limiting the length to 11 alphanumeric characters.
   * 3. Injecting dashes to group the characters as the user types.
   */
  // 2. Glasses Frame Serial Code Mask (Example: OPT-2026-8842)
  const handleSerialMask = (e) => {
    // A: Clean input, keeping only letters/numbers and converting to Uppercase
    // [^a-zA-Z0-9] matches anything that is NOT a letter or a number. We replace those with an empty string.
    const rawAlphaNum = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // slice(0, 11) ensures a maximum of 11 valid characters are processed.
    const trimmed = rawAlphaNum.slice(0, 11); // 3 letters + 4 year digits + 4 code digits

    let formatted = trimmed;
    if (trimmed.length > 7) {
      // Inserts two dashes when there are more than 7 characters (e.g. ABC-1234-5678)
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 3) {
      // Inserts one dash when there are between 4 and 7 characters (e.g. ABC-123)
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    }

    // Update the state with the newly formatted string.
    setFrameSerial(formatted);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🎭 Live Format Masks (Manual Input Masking)</h2>

      <div className="space-y-6">
        {/* --- FIELD 1: PHONE MASK --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Phone Number (Auto-formatting):</label>
          <input
            type="text"
            // The input's value is tightly bound to the React state (controlled component).
            value={phoneNumber}
            // The onChange event triggers our masking logic every time the user types a key.
            onChange={handlePhoneMask}
            placeholder="0790-000-0000"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm tracking-wider focus:border-cyan-500 focus:outline-none transition"
          />
          <span className="text-[10px] text-slate-500 block mt-1">
            State value saved in memory: <code className="text-emerald-400">"{phoneNumber}"</code>
          </span>
        </div>

        {/* --- FIELD 2: FRAME SERIAL MASK --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Frame Serial Code:</label>
          <input
            type="text"
            // Bound to the frameSerial state variable
            value={frameSerial}
            // Triggers the custom alphanumeric masking logic
            onChange={handleSerialMask}
            placeholder="OPT-2026-XXXX"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm tracking-wider focus:border-cyan-500 focus:outline-none transition"
          />
          <span className="text-[10px] text-slate-500 block mt-1">
            Automatically converts to uppercase and separates sections with dashes!
          </span>
        </div>
      </div>
    </div>
  );
};
