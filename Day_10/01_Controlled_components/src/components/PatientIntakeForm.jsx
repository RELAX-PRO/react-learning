import React, { useState } from 'react';

/**
 * Example 1: Basic Controlled Components
 * 
 * In this example, we control individual input fields using separate state variables.
 * This is perfect for small forms. We also demonstrate "Real-time Validation"
 * by preventing the user from typing invalid characters.
 *
 * --- UNDERLYING MECHANICS OF CONTROLLED COMPONENTS ---
 * 1. State as the "Single Source of Truth": In a controlled component, the React
 *    state holds the current value of the input. The `<input>` tag itself does
 *    not maintain its own internal state as it normally would in raw HTML.
 * 2. The `value` Prop: We explicitly tell the `<input>` what its value should be
 *    by passing the state variable to the `value` prop. This locks the input's
 *    display to the state.
 * 3. The `onChange` Handler: When the user types, the input fires an `onChange`
 *    event. Because the value is locked to state, the typing does not immediately
 *    appear in the box. Instead, the `onChange` handler captures the keystroke,
 *    updates the React state (via `setX`), which triggers a re-render. The new
 *    render pushes the updated state back into the `value` prop, making the
 *    character appear on screen.
 * 4. Interception & Sanitization: Because we sit in the middle of the keystroke
 *    and the display, we can easily modify the input (e.g., strip numbers or
 *    force uppercase) *before* updating the state.
 */
export const PatientIntakeForm = () => {
  // 1. Initialize state to store the controlled values
  // `useState("")` creates a state variable initialized to an empty string.
  // The first element is the value, the second is the setter function.
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 2. Controlled Handler: Prevent numbers in patient names immediately.
  const handleNameChange = (e) => {
    // `e` is the SyntheticEvent object provided by React.
    // `e.target` refers to the DOM element that triggered the event (the <input>).
    // `e.target.value` grabs the raw string that the user is attempting to type.
    const rawInput = e.target.value;
    
    // Strip out any numeric digits automatically as the user types:
    // `/[0-9]/g` is a regular expression matching any digit from 0 to 9 globally (`g`).
    // `.replace()` replaces those matched digits with an empty string, effectively removing them.
    const cleanText = rawInput.replace(/[0-9]/g, '');
    
    // We update the state with the sanitized text. If the user typed a number,
    // `cleanText` won't include it, state updates without it, and the input visually ignores it.
    setPatientName(cleanText);
  };

  // 3. Controlled Handler: Restrict to numeric input and enforce maximum length.
  const handlePhoneChange = (e) => {
    // Extract the intended value from the event object
    const rawInput = e.target.value;
    
    // Strip out any non-numeric characters:
    // `/[^0-9]/g` is a regular expression. The `^` inside `[]` means "NOT".
    // So it matches everything that is NOT a digit globally, replacing it with an empty string.
    const onlyNumbers = rawInput.replace(/[^0-9]/g, '');
    
    // Only update state if the length is 11 or less
    // This acts as a hard limit on input length. If the user pastes 15 digits,
    // this condition blocks the state update entirely, and the input box won't change.
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  // Check if form is valid to enable/disable the submit button
  // A boolean flag calculated on every render based on the current state.
  const isFormValid = patientName.length >= 3 && phoneNumber.length === 11;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-cyan-400 mb-6">🩺 Patient Intake Portal</h2>

      {/* --- FIELD 1: CONTROLLED NAME INPUT --- */}
      <div className="mb-4">
        <label className="block text-xs text-slate-400 mb-1">Patient Full Name (No Numbers Allowed):</label>
        <input
          type="text"
          value={patientName}         // Controlled by React State. The value is strictly tied to `patientName`.
          onChange={handleNameChange} // Real-time Sanitization. Fires every time a keystroke occurs.
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
          {/* Dynamically displays the length of the string stored in state */}
          Digits entered: {phoneNumber.length} / 11
        </span>
      </div>

      {/* --- CONDITIONAL UI: Button disables itself if form is invalid --- */}
      <button
        // The `disabled` attribute evaluates the `isFormValid` boolean. 
        // If false, the button is unclickable and styling is applied via Tailwind's `disabled:` variants.
        disabled={!isFormValid}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold transition cursor-pointer disabled:cursor-not-allowed"
      >
        Save Patient Record
      </button>
    </div>
  );
};
