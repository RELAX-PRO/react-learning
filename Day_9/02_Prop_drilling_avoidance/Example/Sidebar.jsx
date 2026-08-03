// =========================================================================
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Rendering Slots (Example)
  =============================================================================
  This `Sidebar` component acts as a container. It accepts a `userSlot` prop, 
  which is expected to be a ready-made React node (like `<DoctorBadge />`).
  This pattern allows the `Sidebar` to display complex UI components without 
  needing to know any of the underlying data (like doctor name or role), 
  preventing "prop drilling".
  =============================================================================
*/
import React from 'react';

// Inline Comment: We extract `userSlot` from props directly
const Sidebar = ({ userSlot }) => {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 border-l border-slate-800 flex flex-col justify-between">
      
      {/* الروابط العامة للقائمة الجانبية */}
      <nav className="space-y-2">
        <a href="/" className="block p-2 rounded hover:bg-slate-800 text-white font-mono">📊 اللوحة الرئيسية</a>
        <a href="/patients" className="block p-2 rounded hover:bg-slate-800 text-white font-mono">🗂️ سجلات المرضى</a>
      </nav>

      {/* 🪄 هنا الفتحة (The Slot): نرسم المكون الجاهز الذي استلمناه كما هو! */}
      {/* Inline Comment: Simply render the injected slot at the bottom of the sidebar */}
      <div className="mt-auto border-t border-slate-800 pt-4">
        {userSlot}
      </div>

    </aside>
  );
};

export default Sidebar;