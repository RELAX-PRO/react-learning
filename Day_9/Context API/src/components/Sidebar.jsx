// ==========================================
// File 3: src/components/Sidebar.jsx (مكون فرعي مدفون)
// ==========================================
import React, { useContext } from 'react';
import { ClinicContext } from '../context/ClinicContext'; // 👈 استدعنا نفس القناة

const Sidebar = () => {
  // 3. التقاط البث! (بالضبط كما توقعت أنت 100% 👏):
  const { role, doctorName } = useContext(ClinicContext);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <h3>مرحباً بك يا: {doctorName}</h3>
      <p>صلاحيتك الحالية في النظام هي: {role}</p>
    </div>
  );
};

export default Sidebar;