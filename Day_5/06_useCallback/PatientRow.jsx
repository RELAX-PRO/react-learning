/**
 * ============================================================================
 * BLOCK COMMENT: Optimizing with React.memo
 * ============================================================================
 * `React.memo` is a higher-order component. If your component renders the same
 * result given the same props, you can wrap it in a call to `React.memo` for
 * a performance boost by memoizing the result.
 * 
 * React will skip rendering the component and reuse the last rendered result.
 * IMPORTANT: It only checks for prop changes using shallow equality.
 * If you pass a new object or a new function reference as a prop, it WILL re-render.
 * That's why we pair `React.memo` with `useCallback` in the parent component.
 * ============================================================================
 */

// =========================================================================
// File 1: PatientRow.jsx (The Child Component - Wrapped in React.memo)
// =========================================================================
import React from 'react';

//  THE SHIELD: React.memo prevents re-rendering unless 'data' or 'onDelete' references change!
// We destructure { data, onDelete } from the props object
const PatientRow = React.memo(({ data, onDelete }) => {
  console.log(` Rendering Patient Row for ID: [${data.id}] - ${data.name}`);

  return (
    <div className="flex justify-between items-center p-3 bg-slate-800 border border-slate-700 rounded mb-2 font-mono">
      <div>
        <span className="font-bold text-blue-400">{data.name}</span>
        <span className="text-xs text-slate-400 ml-4">Right Eye: {data.visionRight} | Left Eye: {data.visionLeft}</span>
      </div>
      <button
        // Using an inline arrow function here is fine because this is inside the DOM element event handler,
        // it doesn't get passed to another React component as a prop.
        onClick={() => onDelete(data.id)}
        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition"
      >
        Archive 
      </button>
    </div>
  );
});

export default PatientRow;