import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

/**
 * Example 1: Using the <IMaskInput /> Component
 * 
 * react-imask provides a pre-built component that handles all the masking logic for you.
 * This is the simplest way to add an input mask.
 * 
 * How the mask string works:
 * - '0' forces the user to enter a digit (0-9).
 * - '-' is a static character that will automatically be inserted by the mask.
 */
export const PhoneMaskExample = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <label className="block text-xs text-slate-400 mb-1">Phone Number:</label>
      
      <IMaskInput
        // The mask pattern: digits only, formatted as XXXX-XXX-XXXX
        mask="0700-000-0000"
        
        // The current value from React state
        value={phone}
        
        // onAccept is called whenever a valid character is typed. 
        // It provides the masked value.
        onAccept={(value) => setPhone(value)}
        
        placeholder="07XX-XXX-XXXX"
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
      />
      
      <p className="text-xs text-emerald-400 mt-2">Saved State: "{phone}"</p>
    </div>
  );
};
