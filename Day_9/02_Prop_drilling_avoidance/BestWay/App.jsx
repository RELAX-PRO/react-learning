// =========================================================================
// =========================================================================
import React from 'react';
import MainLayout from './layouts/MainLayout';
import DoctorBadge from './components/DoctorBadge';

const App = () => {
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };

  return (
    <MainLayout sidebarSlot={<DoctorBadge doctor={doctor} />}>
      <div className="text-cyan-400 font-mono">📊 اللوحة الرئيسية لنظام البصريات...</div>
    </MainLayout>
  );
};

export default App;