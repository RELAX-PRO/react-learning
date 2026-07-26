import React, { useState } from 'react';

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
  // 1. Single Select State: Starts as an empty string (no brand chosen)
  const [selectedBrand, setSelectedBrand] = useState("");

  // 2. Multi-Select State: Starts as an empty array (no coatings chosen)
  const [selectedCoatings, setSelectedCoatings] = useState([]);

  // Handler for the Multi-Select input
  const handleCoatingsChange = (e) => {
    // Array.from is needed because e.target.selectedOptions is an HTMLCollection, not a pure array
    const chosenOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedCoatings(chosenOptions);
  };

  // Calculate approximate total price
  const calculateTotal = () => {
    const frame = FRAME_BRANDS.find((b) => b.id === selectedBrand);
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
            value={selectedBrand} // React controls the selected option based on this value
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {/* The Placeholder Option: Disabled and hidden so they can't reselect it */}
            <option value="" disabled hidden>
              -- Select a Brand --
            </option>

            {/* Dynamically generating <option> tags from our mock data */}
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
            multiple={true} // 👈 This turns the dropdown into a multi-select box
            value={selectedCoatings} // Bound to our array state
            onChange={handleCoatingsChange}
            className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 h-28 cursor-pointer"
          >
            {LENS_COATINGS.map((coating) => (
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
            <span className="text-white font-bold">{selectedBrand || "None"}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Selected Coatings:</span>
            <span className="text-cyan-400 font-bold">{selectedCoatings.length} layer(s)</span>
          </div>
          <div className="border-t border-slate-800 pt-2 mt-2 flex justify-between text-sm font-bold text-emerald-400">
            <span>Estimated Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};