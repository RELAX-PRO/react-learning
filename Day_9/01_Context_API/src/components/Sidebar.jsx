// ==========================================
// ==========================================
/*
  =============================================================================
  BLOCK COMMENT: Context API Consumption
  =============================================================================
  This file demonstrates how to consume data from a React Context. 
  By using the `useContext` hook, we bypass prop drilling and directly tap 
  into the `ClinicContext`. Any changes in the Provider's value will cause 
  this component (and any other consumer) to re-render automatically with 
  the latest data.
  =============================================================================
*/
import React, { useContext } from 'react';
import { ClinicContext } from '../context/ClinicContext';

const Sidebar = () => {
  // Inline Comment: Destructure `role` and `doctorName` directly from the Context
  const { role, doctorName } = useContext(ClinicContext);

  return (
    <div className="p-4 bg-slate-900 text-white">
      {/* Render the dynamically injected context values */}
      <h3>Doctor: {doctorName}</h3>
      <p>Role: {role}</p>
    </div>
  );
};

export default Sidebar;