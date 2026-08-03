// =========================================================================
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Component Composition (Slots Pattern)
  =============================================================================
  This file demonstrates avoiding "prop drilling" (passing props through 
  intermediate components that don't need them) by using Component Composition.
  Instead of passing the `doctor` data to `MainLayout`, we pass an already 
  constructed `<DoctorBadge>` component as a "slot" prop (sidebarSlot). 
  This keeps `MainLayout` clean and decoupled from data it doesn't care about.
  =============================================================================
*/
import React from 'react';
import MainLayout from './layouts/MainLayout';
import DoctorBadge from './components/DoctorBadge';

const App = () => {
  // Inline Comment: Local state/data that needs to be displayed deep in the tree
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };

  return (
    // Inline Comment: We render DoctorBadge right here where we have the data, and pass the resulting element as a prop
    <MainLayout sidebarSlot={<DoctorBadge doctor={doctor} />}>
      <div className="text-cyan-400 font-mono">📊 اللوحة الرئيسية لنظام البصريات...</div>
    </MainLayout>
  );
};

export default App;