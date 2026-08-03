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

/*
  ======================================================================================
  MECHANICS OF IMaskInput IN REACT
  ======================================================================================
  The `IMaskInput` component is a wrapper around a standard HTML `<input>` element.
  It intercepts user input events (like keystrokes or pastes) before they update 
  the input's internal value or notify React. 
  
  When a user types:
  1. The underlying IMask core engine evaluates the character against the `mask` prop.
  2. If valid, the character (and any necessary static characters like hyphens) are 
     added to the input's visual value.
  3. The `onAccept` callback fires, passing the new, fully masked string so React
     can update its state.
     
  Because `IMaskInput` manages its own internal masking state, it's often used in a 
  "semi-controlled" way. We pass the `value` prop (controlled) but listen to `onAccept`
  rather than a standard `onChange` to ensure we capture the mask-processed string.
  ======================================================================================
*/
export const PhoneMaskExample = () => {
  // useState hook to store the phone number locally in the component's state
  const [phone, setPhone] = useState("");

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <label className="block text-xs text-slate-400 mb-1">Phone Number:</label>
      
      <IMaskInput
        // The mask pattern: digits only, formatted as XXXX-XXX-XXXX
        // '0' requires a number. The mask expects exactly 11 digits, with '-' auto-inserted.
        mask="0700-000-0000"
        
        // The current value from React state
        value={phone}
        
        // onAccept is called whenever a valid character is typed. 
        // It provides the masked value.
        // E.g. if the user types '0712', onAccept provides '0712-'
        onAccept={(value) => setPhone(value)}
        
        // The placeholder is just a visual guide in the empty input field.
        placeholder="07XX-XXX-XXXX"
        
        // Tailwind CSS classes for styling the input element
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
      />
      
      {/* 
        This paragraph displays the raw 'phone' state value to visualize 
        what is being stored behind the scenes after the mask has processed the input.
      */}
      <p className="text-xs text-emerald-400 mt-2">Saved State: "{phone}"</p>
    </div>
  );
};
