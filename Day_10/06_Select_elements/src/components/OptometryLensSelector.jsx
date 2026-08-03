import React, { useState } from 'react';

/**
 * UNDERSTANDING CONTROLLED SELECT ELEMENTS IN REACT
 * 
 * In standard HTML, form elements like <select>, <input>, and <textarea> 
 * typically maintain their own internal state. When a user interacts with 
 * them, the DOM updates independently of any JavaScript logic.
 * 
 * However, in React, we prefer to have a "Single Source of Truth". 
 * We achieve this using "Controlled Components", where React state 
 * explicitly dictates what is rendered in the form element at any given time.
 * 
 * The `value` prop of the `<select>` element is tied to a state variable,
 * and the `onChange` event handler updates that state variable.
 */

// Mock data: Could be fetched from an API in a real application
const FRAME_BRANDS = [
  { id: "rayban", name: "Ray-Ban Aviator", price: 150 },
  { id: "oakley", name: "Oakley Sport", price: 180 },
  { id: "silhouette", name: "Silhouette Titanium", price: 250 },
  { id: "persol", name: "Persol Classic", price: 210 }
];

const LENS_COATINGS = [
  { id: "anti_scratch", label: "Anti-Scratch Coating ($20)" },
  { id: "blue_light", label: "Blue Light Filter ($35)" },
  { id: "anti_glare", label: "Anti-Glare Night Vision ($25)" },
  { id: "uv_protection", label: "100% UV Protection ($15)" }
];

/**
 * Example 1: Controlled Select Elements
 * 
 * Demonstrates how to handle standard dropdowns (Single Select)
 * as well as list boxes allowing multiple choices (Multi-Select).
 */
export const OptometryLensSelector = () => {
  /*
   * COMPONENT STATE DECLARATION
   * 
   * React's `useState` hook is used here to create state variables that will
   * control the selected options in our UI.
   */

  // 1. Single Select State: Starts as an empty string (no brand chosen)
  // `selectedBrand` holds the current value, `setSelectedBrand` is the setter function
  const [selectedBrand, setSelectedBrand] = useState("");

  // 2. Multi-Select State: Starts as an empty array (no coatings chosen)
  // `selectedCoatings` stores an array of string IDs representing selected options
  const [selectedCoatings, setSelectedCoatings] = useState([]);

  /**
   * MECHANICS OF MULTI-SELECT `onChange`
   * 
   * Handling a multi-select box is more complex than a standard input. 
   * A standard input provides the new value directly at `e.target.value`. 
   * However, for a `<select multiple>`, `e.target.selectedOptions` contains 
   * all the currently selected `<option>` elements as an `HTMLCollection`.
   */
  // Handler for the Multi-Select input
  const handleCoatingsChange = (e) => {
    // Array.from is needed because e.target.selectedOptions is an HTMLCollection, not a pure array
    // We map over this collection to extract the `value` attribute of each selected option.
    const chosenOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    
    // Update the React state with the new array of selected coating IDs
    setSelectedCoatings(chosenOptions);
  };

  // Calculate approximate total price
  const calculateTotal = () => {
    // Array.prototype.find() locates the brand object matching the selected ID
    const frame = FRAME_BRANDS.find((b) => b.id === selectedBrand);
    // Use ternary operator to handle the case where no frame is selected (frame is undefined)
    const framePrice = frame ? frame.price : 0;
    
    // Quick price estimation (assuming average $25 per coating for simplicity)
    const coatingsPrice = selectedCoatings.length * 25; 
    return framePrice + coatingsPrice;
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">👓 Glasses Customization</h2>

      <div className="space-y-6">
        {/* --- FIELD 1: SINGLE SELECT (DYNAMIC OPTIONS) --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-2">Frame Brand (Single Select):</label>
          <select
            // The `value` prop makes this a controlled component, tied to `selectedBrand` state
            value={selectedBrand} // React controls the selected option based on this value
            // The `onChange` prop fires when the user selects a different option
            // `e.target.value` grabs the `value` attribute of the newly selected <option>
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {/* The Placeholder Option: Disabled and hidden so they can't reselect it */}
            <option value="" disabled hidden>
              -- Select a Brand --
            </option>

            {/* Dynamically generating <option> tags from our mock data */}
            {/* The `key` prop is crucial when mapping over lists in React to help it track element updates efficiently */}
            {FRAME_BRANDS.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name} (${brand.price})
              </option>
            ))}
          </select>
        </div>

        {/* --- FIELD 2: MULTI-SELECT --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Lens Coatings (Multi-Select):
            <span className="block text-[10px] text-amber-400 mt-0.5">
              💡 Hold Ctrl (or Cmd on Mac) to select multiple options
            </span>
          </label>
          <select
            // The `multiple` attribute transforms the standard dropdown into a list box
            multiple={true} // 👈 This turns the dropdown into a multi-select box
            value={selectedCoatings} // Bound to our array state
            // Points to our custom handler function to process the HTMLCollection
            onChange={handleCoatingsChange}
            className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 h-28 cursor-pointer"
          >
            {/* Mapping through lens coatings array to render each option */}
            {LENS_COATINGS.map((coating) => (
              // Each option represents a coating. Selecting it adds `coating.id` to the state array.
              <option key={coating.id} value={coating.id} className="p-2 hover:bg-slate-800 rounded mb-1">
                {coating.label}
              </option>
            ))}
          </select>
        </div>

        {/* --- LIVE SUMMARY PANEL --- */}
        <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 text-xs space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Selected Frame:</span>
            {/* Short-circuit evaluation: prints "None" if selectedBrand is falsy (empty string) */}
            <span className="text-white font-bold">{selectedBrand || "None"}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Selected Coatings:</span>
            {/* Accessing the `.length` property of the `selectedCoatings` array state */}
            <span className="text-cyan-400 font-bold">{selectedCoatings.length} layer(s)</span>
          </div>
          <div className="border-t border-slate-800 pt-2 mt-2 flex justify-between text-sm font-bold text-emerald-400">
            <span>Estimated Total:</span>
            {/* Calling the calculateTotal function during render to get the derived state */}
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};