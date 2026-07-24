// ==========================================
// File 2: src/App.jsx (المكون الأب لكل التطبيق)
// ==========================================
import React from 'react';
import { ClinicContext } from './context/ClinicContext'; // 👈 استدعنا القناة
import MainLayout from './layouts/MainLayout';

const App = () => {
  // هذه هي البيانات التي نريد بثها لكل الغرف (بدلاً من تمريرها بالـ Props):
  const myBroadcastData = {
    role: "ADMIN",
    doctorName: "Dr. Ahmed",
    branch: "Mosul Center Branch"
  };

  return (
    // 2. نغلف المحتوى بوسم الـ Provider، ونضع البيانات في خاصية value:
    <ClinicContext.Provider value={myBroadcastData}>
      
      {/* أي شاشة أو مكون يوضع هنا في الداخل... سيستطيع قراءة البيانات فوراً! */}
      <MainLayout />
      
    </ClinicContext.Provider>
  );
};

export default App;