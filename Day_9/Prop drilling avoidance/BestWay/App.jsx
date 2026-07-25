// =========================================================================
// 2. الطابق الأول: App.jsx (هنا نجمع القطع مثل المكعبات - Lego Bricks!)
// =========================================================================
import React from 'react';
import MainLayout from './layouts/MainLayout';
import DoctorBadge from './components/DoctorBadge';

const App = () => {
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };

  // 🪄 السحر: نبني مكون DoctorBadge هنا ونعطيه البيانات مباشرة!
  // ثم نمرر المكون الجاهز بالكامل داخل فتحة sidebarSlot في اللياوت!
  return (
    <MainLayout sidebarSlot={<DoctorBadge doctor={doctor} />}>
      <div className="text-cyan-400 font-mono">📊 اللوحة الرئيسية لنظام البصريات...</div>
    </MainLayout>
  );
};

export default App;