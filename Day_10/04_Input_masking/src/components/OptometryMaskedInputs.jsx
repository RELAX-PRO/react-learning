// =========================================================================
// File: src/components/OptometryMaskedInputs.jsx
// Description: Manual Input Masking in React without external libraries
// =========================================================================
import React, { useState } from 'react';

export const OptometryMaskedInputs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [frameSerial, setFrameSerial] = useState("");

  // 1. Iraqi Phone Number Mask (Example: 0790-123-4567)
  const handlePhoneMask = (e) => {
    // A: Clean the input by removing any non-digit characters
    const rawDigits = e.target.value.replace(/\D/g, '');

    // B: Prevent input from exceeding 11 digits
    const trimmed = rawDigits.slice(0, 11);

    // C: Dynamically format the string based on its length
    let formatted = trimmed;
    if (trimmed.length > 7) {
      // After the 7th digit: 0790-123-4567
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 4) {
      // After the 4th digit: 0790-123
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4)}`;
    }

    setPhoneNumber(formatted);
  };

  // 2. Glasses Frame Serial Code Mask (Example: OPT-2026-8842)
  const handleSerialMask = (e) => {
    // A: Clean input, keeping only letters/numbers and converting to Uppercase
    const rawAlphaNum = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const trimmed = rawAlphaNum.slice(0, 11); // 3 letters + 4 year digits + 4 code digits

    let formatted = trimmed;
    if (trimmed.length > 7) {
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 3) {
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    }

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
            value={phoneNumber}
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
            value={frameSerial}
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
