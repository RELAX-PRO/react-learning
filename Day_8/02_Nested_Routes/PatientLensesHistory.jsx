// =========================================================================
// File: views/PatientLensesHistory.jsx (A Clean Child Component)
// =========================================================================
import React from 'react';

/**
 * PatientLensesHistory Component
 * This is a child component meant to be rendered inside an <Outlet /> of a parent layout.
 * It demonstrates how a child route's component only needs to care about its own specific UI,
 * while the parent layout handles the overall structure (like sidebars and navbars).
 */
const PatientLensesHistory = () => {
  return (
    {/* Main container for the lenses history view */}
    <div className="animate-fade-in font-mono">
      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">
        ðŸ“œ Historical Refraction Records
      </h3>
      
      {/* Clean, focused UI without worrying about outer page layout! */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">Latest Prescription (OD / OS):</p>
          <p className="text-base font-bold text-slate-100 mt-1">-1.75 SPH / -2.25 SPH</p>
        </div>
        {/* Status badge indicating the current active lens */}
        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 font-bold">
          Active Lens
        </span>
      </div>
    </div>
  );
};

export default PatientLensesHistory;

