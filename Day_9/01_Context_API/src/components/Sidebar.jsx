// ==========================================
// ==========================================
import React, { useContext } from 'react';
import { ClinicContext } from '../context/ClinicContext';

const Sidebar = () => {
  const { role, doctorName } = useContext(ClinicContext);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <h3>Doctor: {doctorName}</h3>
      <p>Role: {role}</p>
    </div>
  );
};

export default Sidebar;