// =========================================================================
// File: src/layouts/MainLayout.jsx (Persistent Layout with Outlet)
// =========================================================================
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

/**
 * MainLayout Component
 * A persistent layout component that includes a sidebar navigation
 * and a main content area where child routes are rendered via <Outlet />.
 * It demonstrates how to keep certain UI elements (like the sidebar)
 * persistent across different pages.
 */
const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white font-mono">
      
      {/* 1. Ø§Ù„Ø´Ø±ÙŠØ· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ø§Ù„Ø«Ø§Ø¨Øª (Sidebar) */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-400 mb-8">ðŸ‘ï¸ OPTICAL OS</h1>
          
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
              ðŸ“Š Executive Dashboard
            </NavLink>

            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `p-3 rounded-xl font-bold text-xs transition ${
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-900"
                }`
              }
            >
              ðŸ—‚ï¸ Patient Records
            </NavLink>

            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `p-3 rounded-xl font-bold text-xs transition ${
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-900"
                }`
              }
            >
              ðŸ•¶ï¸ Frames Inventory
            </NavLink>
          </nav>
        </div>

        <div className="text-[10px] text-slate-500 text-center">
          System v2026.08 Ready
        </div>
      </aside>

      {/* 2. Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù…ØªØºÙŠØ±Ø© (The Outlet) */}
      {/* Ø£ÙŠ Ø´Ø§Ø´Ø© ÙŠØ®ØªØ§Ø±Ù‡Ø§ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù…Ù† Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø³ØªÙØ±Ø³Ù… Ù‡Ù†Ø§ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ø¯ÙˆÙ† Ù„Ù…Ø³ Ø§Ù„Ø´Ø±ÙŠØ· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ! */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;

