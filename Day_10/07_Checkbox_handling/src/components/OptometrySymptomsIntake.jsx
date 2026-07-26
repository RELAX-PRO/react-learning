import React, { useState } from 'react';

// Mock list of symptoms available in the clinic
const EYE_SYMPTOMS = [
  { id: "dryness", label: "Dry and Red Eyes" },
  { id: "blurriness", label: "Blurry Vision" },
  { id: "headache", label: "Frontal Headaches (especially when reading)" },
  { id: "light_sensitivity", label: "High Sensitivity to Light" }
];

/**
 * Example 1: Handling Checkboxes
 * 
 * Demonstrates how to handle a standard single Checkbox (Boolean) 
 * as well as a Group of Checkboxes mapping to an Array.
 */
export const OptometrySymptomsIntake = () => {
  // 1. Single Checkbox State (Boolean)
  const [hasInsurance, setHasInsurance] = useState(false);

  // 2. Checkbox Group State (Array of IDs)
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // =========================================================================
  // 🚀 The Group Checkbox Engine
  // =========================================================================
  const handleSymptomToggle = (symptomId, isChecked) => {
    if (isChecked) {
      // If checked 👈 Add the ID to the array without mutating state directly
      setSelectedSymptoms((prev) => [...prev, symptomId]);
    } else {
      // If unchecked 👈 Remove the ID from the array using .filter()
      setSelectedSymptoms((prev) => prev.filter((id) => id !== symptomId));
    }
  };

  // Reset all choices
  const handleReset = () => {
    setHasInsurance(false);
    setSelectedSymptoms([]);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🩺 Initial Exam & Symptoms</h2>

      {/* --- SECTION 1: SINGLE CHECKBOX (BOOLEAN) --- */}
      <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hasInsurance}
            onChange={(e) => setHasInsurance(e.target.checked)} // 👈 Always read 'checked', not 'value'
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
          <span className="text-sm font-bold text-slate-200">
            Does the patient have active medical insurance?
          </span>
        </label>

        {/* Conditional UI based on boolean checkbox */}
        {hasInsurance && (
          <p className="text-xs text-emerald-400 mt-2 block pl-8 animate-fade-in">
            ✅ Excellent! Please prepare your active insurance card at reception.
          </p>
        )}
      </div>

      {/* --- SECTION 2: CHECKBOX GROUP (ARRAY) --- */}
      <div className="mb-6">
        <label className="block text-xs text-slate-400 mb-3 font-bold">
          Select all symptoms the patient is experiencing:
        </label>

        <div className="space-y-2.5">
          {EYE_SYMPTOMS.map((symptom) => {
            // Check if this specific symptom's ID exists in our selected array
            const isChecked = selectedSymptoms.includes(symptom.id);

            return (
              <label
                key={symptom.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                  isChecked 
                    ? "bg-cyan-950/40 border-cyan-500/50 text-white" 
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked} // 👈 Bound based on array inclusion
                  onChange={(e) => handleSymptomToggle(symptom.id, e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
                <span className="text-sm">{symptom.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* --- LIVE STATE DEBUGGER --- */}
      <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 text-xs space-y-2">
        <div className="flex justify-between text-slate-400">
          <span>Medical Insurance:</span>
          <span className={hasInsurance ? "text-emerald-400 font-bold" : "text-red-400"}>
            {hasInsurance ? "Covered ✅" : "Not Covered ❌"}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-1">Registered Symptoms ({selectedSymptoms.length}):</span>
          <code className="text-cyan-300 block bg-slate-900 p-2 rounded">
            {selectedSymptoms.length > 0 ? JSON.stringify(selectedSymptoms) : "[ No Symptoms Selected ]"}
          </code>
        </div>
      </div>

      {/* --- RESET BUTTON --- */}
      <button
        onClick={handleReset}
        className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-xs text-slate-300 transition cursor-pointer"
      >
        🗑️ Reset All Choices
      </button>
    </div>
  );
};