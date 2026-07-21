// =========================================================================
// File: components/ClinicSidebar.jsx (Mastering NavLink & UI Active States)
// =========================================================================
import React from 'react';
// 1. Import Link and NavLink from the routing library:
import { Link, NavLink } from 'react-router-dom';

const ClinicSidebar = () => {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between min-h-screen font-mono text-white">
      
      {/* Brand Logo - Using standard <Link> because it doesn't need an "active" highlighted state */}
      <div>
        <Link to="/" className="flex items-center gap-3 pb-6 border-b border-slate-800/80 mb-6 group">
          <span className="text-2xl">👁️</span>
          <div>
            <span className="font-bold text-sm block tracking-wider text-blue-400 group-hover:text-blue-300 transition">
              OPTICAL VAULT
            </span>
            <span className="text-[10px] text-slate-500 block">SaaS OS v2026</span>
          </div>
        </Link>

        {/* Navigation Menu - Using <NavLink> for dynamic active styling */}
        <nav className="space-y-2">
          
          <NavLink
            to="/"
            end // 'end' ensures "/" is not highlighted when visiting sub-paths like "/patients"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" // 👈 Active UI state
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200" // 👈 Inactive UI state
              }`
            }
          >
            <span>📊</span>
            <span>Executive Dashboard</span>
          </NavLink>

          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`
            }
          >
            <span>🗂️</span>
            <span>Patient Records</span>
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`
            }
          >
            <span>🕶️</span>
            <span>Frames Inventory</span>
          </NavLink>

        </nav>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
        <span className="text-[11px] text-slate-400 block mb-2">Need to register a case?</span>
        {/* Standard Link styled as a CTA Button */}
        <Link
          to="/patients/new"
          className="block w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-md"
        >
          + New Examination ✍️
        </Link>
      </div>

    </aside>
  );
};

export default ClinicSidebar;