// =========================================================================
// File 2: OptometryTerminalPro.jsx (The Parent Component - Using useCallback)
// =========================================================================
import React, { useState, useCallback } from 'react';
import PatientRow from './PatientRow.jsx';

const initialPatients = [
  { id: "OPT-101", name: "Ahmed Al-Mosuli", visionRight: "-1.50", visionLeft: "-1.75" },
  { id: "OPT-102", name: "Sara Al-Iraqi", visionRight: "6/6", visionLeft: "6/6" },
  { id: "OPT-103", name: "Zaid Al-Basri", visionRight: "+2.00", visionLeft: "+1.25" }
];

const OptometryTerminalPro = () => {
  const [patientsList, setPatientsList] = useState(initialPatients);
  const [terminalTheme, setTerminalTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");

  // 🛡️ THE CACHED FUNCTION REFERENCE:
  // Thanks to useCallback + empty array [ ], React freezes this function in RAM!
  // Clicking "Toggle Theme" or typing in Search WILL NOT recreate this function!
  const handleArchivePatient = useCallback((patientId) => {
    console.log(`🗑️ Archiving patient record: ${patientId}`);
    setPatientsList(prevList => prevList.filter(p => p.id !== patientId));
  }, []); // Functional update 'prevList' means we don't even need 'patientsList' in dependencies!

  return (
    <div className={`p-6 rounded-xl font-mono min-h-screen ${terminalTheme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <h1 className="text-xl font-bold text-blue-500">👁️ Clinical Vision Archive System</h1>
        
        {/* Clicking this updates state and causes Parent Re-render, but ZERO Child Re-renders! */}
        <button
          onClick={() => setTerminalTheme(prev => prev === "dark" ? "light" : "dark")}
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
        >
          Toggle Theme 🌓 ({terminalTheme})
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Type to test UI responsiveness..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-sm text-slate-400 mb-2">Active Patient Files ({patientsList.length}):</h2>
        {patientsList.map(patient => (
          <PatientRow
            key={patient.id}
            data={patient}
            onDelete={handleArchivePatient} // <-- Passing the frozen reference!
          />
        ))}
      </div>
    </div>
  );
};

export default OptometryTerminalPro;