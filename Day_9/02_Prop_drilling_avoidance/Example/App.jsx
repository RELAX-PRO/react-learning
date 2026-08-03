// =========================================================================
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Slot Injection
  =============================================================================
  Another example of avoiding prop drilling. In this `App` component, we hold 
  the `doctorData`. Instead of passing `doctorData` to `Sidebar` so it can 
  eventually pass it to `DoctorBadge`, we assemble the `<DoctorBadge>` here 
  and pass the constructed element to `Sidebar` as a slot (`userSlot`).
  =============================================================================
*/
import React from 'react';
import Sidebar from './components/Sidebar';
import DoctorBadge from './components/DoctorBadge';

const App = () => {
  // Inline Comment: We declare the data here because this component owns the state
  const doctorData = { name: "د. أحمد", role: "مدير العيادة" };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      
      {/* 🚀 السحر: مررنا مكون DoctorBadge جاهزاً ومبنيّاً داخل الفتحة (slot) */}
      {/* Inline Comment: Injects the DoctorBadge element into the 'userSlot' prop of Sidebar */}
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