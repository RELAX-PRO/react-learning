// =========================================================================
// File: views/PatientProfileLayout.jsx (The Parent Layout with <Outlet />)
// =========================================================================
import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

/**
 * PatientProfileLayout Component
 * Serves as the parent layout for patient profile pages.
 * The <Outlet /> component from 'react-router-dom' acts as a placeholder
 * where matched child routes will be rendered.
 * NavLink is used to apply active styles based on the current URL.
 * useParams extracts the dynamic 'id' parameter from the URL.
 */
const PatientProfileLayout = () => {
  // Grab the patient ID from the URL (e.g., '884')
  // The 'id' parameter matches the ':id' segment defined in the Route path.
  const { id } = useParams();

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-4xl mx-auto shadow-2xl">
      
      {/* --- SECTION 1: PERSISTENT HEADER (Does not re-render on tab switch.) --- */}
      <div className="flex justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800 mb-6">
        <div>
          <span className="text-xs text-blue-500 uppercase tracking-widest block font-bold">Clinical File Archive</span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">ðŸ‘ï¸ Patient Refraction Vault</h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">System Reference ID</span>
          <span className="text-lg font-bold text-cyan-400">#{id}</span>
        </div>
      </div>

      {/* --- SECTION 2: PERSISTENT NAVIGATION TABS --- */}
      {/* NavLink automatically applies an 'active' state when the URL matches. */}
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
          ðŸ‘“ Optical Prescriptions
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
          ðŸ“… Exam Schedule
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
          ðŸ’³ Billing & Insurance
        </NavLink>
      </div>

      {/* --- SECTION 3: THE OUTLET (Where Child Routes inject their UI) --- */}
      {/* When clicking tabs above, Only this section updates when navigating. */}
      <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800/80 min-h-[300px]">
        
        <Outlet /> 

      </div>

    </div>
  );
};

export default PatientProfileLayout;

