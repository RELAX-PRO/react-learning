import React, { useState, useEffect } from 'react';

const DoctorQuickNote = () => {
  // 1. القراءة الذكية عند تحميل الصفحة لأول مرة فقط (Lazy Initialization):
  const [note, setNote] = useState(() => {
    const savedNote = localStorage.getItem('doctor_quick_note');
    // إذا وجدنا كلاماً محفوظاً سابقاً نسترجعه، وإذا كانت الخزنة فارغة نبدأ بنص فارغ
    return savedNote !== null ? JSON.parse(savedNote) : "";
  });

  // 2. المراقبة والحفظ التلقائي عند أي تغيير:
  useEffect(() => {
    // في كل مرة يكتب الطبيب حرفاً جديداً، نحفظ النص فوراً في الخزنة
    localStorage.setItem('doctor_quick_note', JSON.stringify(note));
  }, [note]); // 👈 هذا المصفوفة تعني: "نفذ الحفظ فقط عندما يتغير النص"

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono max-w-md mx-auto">
      <h3 className="text-cyan-400 font-bold mb-3">📌 مفكرة الطبيب (حفظ تلقائي)</h3>
      
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="اكتب ملاحظة سريعة هنا... ستُحفظ تلقائياً في حاسوبك!"
        className="w-full h-32 p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
      />

      <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
        <span>💾 محمي وحي في localStorage</span>
        {/* زر لتنظيف الخزنة ومسح الملاحظة */}
        <button 
          onClick={() => setNote("")}
          className="text-red-400 hover:underline cursor-pointer"
        >
          🗑️ مسح الملاحظة
        </button>
      </div>
    </div>
  );
};

export default DoctorQuickNote;