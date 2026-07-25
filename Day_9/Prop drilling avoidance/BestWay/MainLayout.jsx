// =========================================================================
// 1. الطابق الثاني: MainLayout.jsx (أصبح نظيفاً تماماً ولا يمرر أي بيانات!)
// =========================================================================
import React from 'react';

// لاحظ: لا يطلب بيانات الطبيب! يطلب فقط مكوناً جاهزاً ليرسمه في المكان المخصص:
const MainLayout = ({ sidebarSlot, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* رسمنا الصندوق الجاهز كما هو دون التفتيش في محتوياته: */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 p-4">
        {sidebarSlot}
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;