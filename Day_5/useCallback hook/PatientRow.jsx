// =========================================================================
// File 1: PatientRow.jsx (The Child Component - Wrapped in React.memo)
// =========================================================================
import React from 'react';

// 🛡️ THE SHIELD: React.memo prevents re-rendering unless 'data' or 'onDelete' references change!
const PatientRow = React.memo(({ data, onDelete }) => {
  console.log(`🎨 Rendering Patient Row for ID: [${data.id}] - ${data.name}`);

  return (
    <div className="flex justify-between items-center p-3 bg-slate-800 border border-slate-700 rounded mb-2 font-mono">
      <div>
        <span className="font-bold text-blue-400">{data.name}</span>
        <span className="text-xs text-slate-400 ml-4">Right Eye: {data.visionRight} | Left Eye: {data.visionLeft}</span>
      </div>
      <button
        onClick={() => onDelete(data.id)}
        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition"
      >
        Archive 🗑️
      </button>
    </div>
  );
});

export default PatientRow;