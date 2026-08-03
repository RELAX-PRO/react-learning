// ==========================================
// ==========================================
/*
  =============================================================================
  BLOCK COMMENT: Context Provider Setup
  =============================================================================
  This is the root of the application where we inject the data into our Context.
  The `ClinicContext.Provider` acts as a broadcaster. Any component placed 
  inside this Provider (like MainLayout and its children) can access the 
  `value` prop without it having to be explicitly passed down via props.
  =============================================================================
*/
import React from 'react';
import { ClinicContext } from './context/ClinicContext';
import MainLayout from './layouts/MainLayout';

const App = () => {
  // Inline Comment: This object represents the shared global state for this context
  const myBroadcastData = {
    role: "ADMIN",
    doctorName: "Dr. Ahmed",
    branch: "Mosul Center Branch"
  };

  return (
    // Inline Comment: Wraps the application and provides the 'myBroadcastData' to all nested components
    <ClinicContext.Provider value={myBroadcastData}>
      
      {/* أي شاشة أو مكون يوضع هنا في الداخل... سيستطيع قراءة البيانات فوراً! */}
      <MainLayout />
      
    </ClinicContext.Provider>
  );
};

export default App;