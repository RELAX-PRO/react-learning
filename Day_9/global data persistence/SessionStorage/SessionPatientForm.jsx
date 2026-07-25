import React, { useState, useEffect } from 'react';

const SessionPatientForm = () => {
  // 1. الخطوة الأولى: القراءة عند فتح التبويب لأول مرة فقط
  const [patientName, setPatientName] = useState(() => {
    // 👈 لاحظ استخدام sessionStorage بدلاً من localStorage
    const savedName = sessionStorage.getItem('temp_session_patient_name');
    return savedName !== null ? JSON.parse(savedName) : "";
  });

  // 2. الخطوة الثانية: الحارس الذكي الذي يحفظ عند أي تغيير في الاسم
  useEffect(() => {
    // 👈 الحفظ في ذاكرة الجلسة الحالية فقط
    sessionStorage.setItem('temp_session_patient_name', JSON.stringify(patientName));
  }, [patientName]); // 👈 لا تعمل إلا إذا تغير اسم المريض

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