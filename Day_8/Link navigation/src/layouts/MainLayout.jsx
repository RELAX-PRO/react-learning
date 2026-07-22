// =========================================================================
// File: src/layouts/MainLayout.jsx (Persistent Layout with Outlet)
// =========================================================================
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white font-mono">
      
      {/* 1. الشريط الجانبي الثابت (Sidebar) */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-400 mb-8">👁️ OPTICAL OS</h1>
          
          <nav className="space-y-2 flex flex-col">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `p-3 rounded-xl font-bold text-xs transition ${
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-900"
                }`
              }
            >
              📊 Executive Dashboard
            </NavLink>

            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `p-3 rounded-xl font-bold text-xs transition ${
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-900"
                }`
              }
            >
              🗂️ Patient Records
            </NavLink>

            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `p-3 rounded-xl font-bold text-xs transition ${
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-900"
                }`
              }
            >
              🕶️ Frames Inventory
            </NavLink>
          </nav>
        </div>

        <div className="text-[10px] text-slate-500 text-center">
          System v2026.08 Ready
        </div>
      </aside>

      {/* 2. مساحة العرض المتغيرة (The Outlet) */}
      {/* أي شاشة يختارها المستخدم من القائمة ستُرسم هنا تلقائياً دون لمس الشريط الجانبي! */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;