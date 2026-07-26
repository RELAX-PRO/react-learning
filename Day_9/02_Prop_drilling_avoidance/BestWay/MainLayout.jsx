// =========================================================================
// =========================================================================
import React from 'react';

// This layout accepts ready-made UI pieces instead of passing raw data down repeatedly.
const MainLayout = ({ sidebarSlot, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* sidebarSlot is a full component, so the layout just renders it in place. */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 p-4">
        {sidebarSlot}
      </aside>

      {/* children is the main page content passed into the layout. */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;