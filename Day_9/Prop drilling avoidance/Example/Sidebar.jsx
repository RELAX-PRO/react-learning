// =========================================================================
// 1. Sidebar.jsx (مكون وسيط نظيف وأعمى عن البيانات!)
// =========================================================================
import React from 'react';

const Sidebar = ({ userSlot }) => {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 border-l border-slate-800 flex flex-col justify-between">
      
      {/* الروابط العامة للقائمة الجانبية */}
      <nav className="space-y-2">
        <a href="/" className="block p-2 rounded hover:bg-slate-800 text-white font-mono">📊 اللوحة الرئيسية</a>
        <a href="/patients" className="block p-2 rounded hover:bg-slate-800 text-white font-mono">🗂️ سجلات المرضى</a>
      </nav>

      {/* 🪄 هنا الفتحة (The Slot): نرسم المكون الجاهز الذي استلمناه كما هو! */}
      <div className="mt-auto border-t border-slate-800 pt-4">
        {userSlot}
      </div>

    </aside>
  );
};

export default Sidebar;