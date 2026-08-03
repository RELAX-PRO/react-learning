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
  /*
   * MECHANICS OF useRef IN UNCONTROLLED COMPONENTS:
   * 
   * The `useRef` hook returns a mutable object with a single property: `.current`.
   * When this ref is attached to a React element via the `ref` attribute (e.g., `ref={patientIdRef}`),
   * React automatically assigns the underlying DOM node (in this case, an HTMLInputElement)
   * to `patientIdRef.current`.
   * 
   * This object persists across all renders of the component, meaning updating `.current` 
   * does not trigger a re-render. This is the core principle of an uncontrolled component:
   * letting the DOM handle its own state and reading it imperatively when needed.
   */

  // 1. Create refs to point to the DOM inputs
  // We initialize with `null` because the DOM node doesn't exist until after the initial render.
  const patientIdRef = useRef(null);
  const searchReasonRef = useRef(null);

  // 2. Read the values ONLY when the form is submitted
  /*
   * EVENT HANDLING IN UNCONTROLLED FORMS:
   * 
   * Rather than updating state on every keystroke (`onChange`), we wait for a single
   * discrete event—typically form submission. When the user clicks the submit button
   * or presses 'Enter', this handler fires.
   * 
   * The event object `e` is a SyntheticEvent. `e.preventDefault()` is essential
   * because the default HTML form behavior is to execute an HTTP GET request to the current URL,
   * which would cause a full page reload and wipe out the React application state.
   */
  const handleSearchSubmit = (e) => {
    // Prevent the browser from refreshing the page
    e.preventDefault(); // Intercepts the default native form submission behavior

    /*
     * READING FROM THE DOM:
     * 
     * Since `patientIdRef.current` holds the actual `<input>` HTML element,
     * we can access any native DOM properties on it. For text inputs, `.value`
     * gives us the current string typed by the user. 
     */
    // Pull the live values directly from the DOM using `.current.value`
    const enteredId = patientIdRef.current.value; // Accessing the native HTMLInputElement.value
    const enteredReason = searchReasonRef.current.value;

    console.log('Form Submitted! Values read directly from the DOM:');
    console.log({ id: enteredId, reason: enteredReason });

    // In a real app, you would send this to an API:
    // fetch('/api/search', { body: JSON.stringify({ enteredId, enteredReason }) })
  };

  /*
   * COMPONENT RENDER MECHANICS:
   * 
   * Notice there are no `useState` hooks here. As the user types into the input fields,
   * React is completely unaware. The component does not re-render. This can lead to 
   * slight performance benefits in very large forms or on low-end devices, as the React 
   * reconciliation process is bypassed entirely during data entry.
   */
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 Quick Patient Search (Uncontrolled)</h2>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* --- FIELD 1: UNCONTROLLED PATIENT ID --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient File ID:</label>
          <input
            type="text"
            ref={patientIdRef}          // Attach the DOM node to the ref (connects React to native DOM)
            defaultValue="ID-"          // Uncontrolled inputs use defaultValue, NOT value!
            /* 
             * `defaultValue` vs `value`:
             * If we used `value="ID-"` without an `onChange` handler, React would make this a 
             * Read-Only input, locking its value. `defaultValue` sets the initial value but lets
             * the DOM take over subsequent updates.
             */
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
          type="submit"                 // Triggers the form's `onSubmit` event handler
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-sm transition cursor-pointer text-slate-950"
        >
          🚀 Search Immediately (Zero Re-renders)
        </button>
      </form>
    </div>
  );
};
