// =========================================================================
// =========================================================================
import React from 'react';
import Sidebar from './components/Sidebar';
import DoctorBadge from './components/DoctorBadge';

const App = () => {
  const doctorData = { name: "د. أحمد", role: "مدير العيادة" };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      
      {/* 🚀 السحر: مررنا مكون DoctorBadge جاهزاً ومبنيّاً داخل الفتحة (slot) */}
      <Sidebar 
        userSlot={<DoctorBadge doctor={doctorData} />} 
      />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-cyan-400 font-mono">مرحباً بك في نظام إدارة البصريات</h1>
      </main>

    </div>
  );
};

export default App;