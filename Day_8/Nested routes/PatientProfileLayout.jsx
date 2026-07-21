// =========================================================================
// File: views/PatientProfileLayout.jsx (The Parent Layout with <Outlet />)
// =========================================================================
import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const PatientProfileLayout = () => {
  // Grab the dynamic patient ID from the URL (e.g., '884')
  const { id } = useParams();

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-4xl mx-auto shadow-2xl">
      
      {/* --- SECTION 1: PERSISTENT HEADER (Never re-renders on tab switch!) --- */}
      <div className="flex justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800 mb-6">
        <div>
          <span className="text-xs text-blue-500 uppercase tracking-widest block font-bold">Clinical File Archive</span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">👁️ Patient Refraction Vault</h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">System Reference ID</span>
          <span className="text-lg font-bold text-cyan-400">#{id}</span>
        </div>
      </div>

      {/* --- SECTION 2: PERSISTENT NAVIGATION TABS --- */}
      {/* NavLink automatically adds an 'active' styling state when the URL matches! */}
      <div className="flex gap-2 border-b border-slate-800 pb-4 mb-6">
        
        <NavLink
          to="lenses"
          end // 'end' ensures exact matching for the root sub-path
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
            }`
          }
        >
          👓 Optical Prescriptions
        </NavLink>

        <NavLink
          to="appointments"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
            }`
          }
        >
          📅 Exam Schedule
        </NavLink>

        <NavLink
          to="billing"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
            }`
          }
        >
          💳 Billing & Insurance
        </NavLink>
      </div>

      {/* --- SECTION 3: THE DYNAMIC OUTLET (Where Child Routes inject their UI) --- */}
      {/* When clicking tabs above, ONLY this box below changes! */}
      <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800/80 min-h-[300px]">
        
        <Outlet /> 

      </div>

    </div>
  );
};

export default PatientProfileLayout;