// =========================================================================
// File: src/components/UncontrolledPatientSearch.jsx
// Description: Zero Re-render Form using useRef (Uncontrolled Architecture)
// =========================================================================
import React, { useRef } from 'react';

export const UncontrolledPatientSearch = () => {
  // 1. إنشاء أسلاك التوصيل المباشرة للـ DOM (بدون تخزين أي بيانات في الذاكرة!):
  const patientIdRef = useRef(null);
  const searchReasonRef = useRef(null);

  // 2. دالة تنطلق فقط وإذا فقط عند الضغط على زر "بحث" (Submit):
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // منع المتصفح من تحديث الصفحة

    // 🪄 السحر: سحب القيم مباشرة من عناصر الـ DOM في اللحظة الأخيرة فقط!
    const enteredId = patientIdRef.current.value;
    const enteredReason = searchReasonRef.current.value;

    console.log("🚀 تم سحب البيانات من الـ DOM مباشرة دون إزعاج React:");
    console.log({ id: enteredId, reason: enteredReason });

    // يمكنك إرسال البيانات مباشرة للسيرفر هنا:
    // axios.post('/api/search', { id: enteredId, reason: enteredReason });
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 التفتيش السريع (Uncontrolled)</h2>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* --- FIELD 1: UNCONTROLLED PATIENT ID --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">رقم ملف المريض:</label>
          <input
            type="text"
            ref={patientIdRef}          // 👈 ربط سلك الـ DOM مباشرة
            defaultValue="ID-"          // 👈 في Uncontrolled نستخدم defaultValue بدل value
            placeholder="مثال: ID-9842"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* --- FIELD 2: UNCONTROLLED REASON --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">سبب الاستعلام السريع:</label>
          <input
            type="text"
            ref={searchReasonRef}       // 👈 ربط سلك الـ DOM مباشرة
            placeholder="مثال: مراجعة قياس النظر..."
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-sm transition cursor-pointer text-slate-950"
        >
          🚀 بحث فوري (بدون Re-render)
        </button>
      </form>
    </div>
  );
};