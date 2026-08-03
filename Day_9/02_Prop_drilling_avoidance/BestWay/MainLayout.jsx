// =========================================================================
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Rendering Component Slots & Children
  =============================================================================
  This Layout component acts as a structural shell. It does not know or care 
  about what specific data is inside `sidebarSlot` or `children`. 
  By accepting React Elements (JSX) instead of raw data props, it completely 
  avoids the need to act as a middleman for prop drilling. This makes the 
  layout highly reusable.
  =============================================================================
*/
import React from 'react';

// This layout accepts ready-made UI pieces instead of passing raw data down repeatedly.
// Inline Comment: Destructuring `sidebarSlot` and the special `children` prop
const MainLayout = ({ sidebarSlot, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* sidebarSlot is a full component, so the layout just renders it in place. */}
      {/* Inline Comment: Injects the predefined UI component exactly here */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 p-4">
        {sidebarSlot}
      </aside>

      {/* children is the main page content passed into the layout. */}
      {/* Inline Comment: The nested JSX tags inside <MainLayout> ... </MainLayout> are rendered here */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;