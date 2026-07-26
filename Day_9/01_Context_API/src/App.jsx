// ==========================================
// ==========================================
import React from 'react';
import { ClinicContext } from './context/ClinicContext';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const myBroadcastData = {
    role: "ADMIN",
    doctorName: "Dr. Ahmed",
    branch: "Mosul Center Branch"
  };

  return (
    <ClinicContext.Provider value={myBroadcastData}>
      
      {/* أي شاشة أو مكون يوضع هنا في الداخل... سيستطيع قراءة البيانات فوراً! */}
      <MainLayout />
      
    </ClinicContext.Provider>
  );
};

export default App;