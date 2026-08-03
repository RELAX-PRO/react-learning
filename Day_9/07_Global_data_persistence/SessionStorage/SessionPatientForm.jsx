/*
  =============================================================================
  BLOCK COMMENT: SessionStorage Persistence
  =============================================================================
  `sessionStorage` is similar to `localStorage`, but the data is only stored 
  for the duration of the page session. It persists over page reloads and 
  restores, but opening a page in a new tab or window causes a new session 
  to be initiated. This makes it perfect for temporary draft data that shouldn't 
  bleed into other tabs.
  =============================================================================
*/
import React, { useState, useEffect } from 'react';

const SessionPatientForm = () => {
  const [patientName, setPatientName] = useState(() => {
    // Inline Comment: Retrieve draft from sessionStorage for the current tab only
    const savedName = sessionStorage.getItem('temp_session_patient_name');
    return savedName !== null ? JSON.parse(savedName) : "";
  });

  useEffect(() => {
    // Inline Comment: Save back to sessionStorage when patientName changes
    sessionStorage.setItem('temp_session_patient_name', JSON.stringify(patientName));
  }, [patientName]);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-amber-400 font-bold">🔒 مسودة المريض (ذاكرة التبويب)</h3>
        <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-1 rounded border border-amber-800">
          تُمسح عند إغلاق التبويب
        </span>
      </div>
      
      <label className="block text-xs text-slate-400 mb-1">اسم المريض المؤقت:</label>
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="مثال: أحمد محمود..."
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-500 mb-3"
      />

      <p className="text-xs text-slate-500 leading-relaxed">
        💡 <strong className="text-slate-400">جرب بنفسك:</strong> اضغط تحديث للصفحة (<code className="text-amber-400">F5</code>) وستجد الاسم كما هو! لكن انسخ رابط الصفحة وافتحه في <strong className="text-red-400">تبويب جديد</strong>، ستجده فارغاً تماماً لأن كل تبويب معزول عن الآخر!
      </p>
    </div>
  );
};

export default SessionPatientForm;