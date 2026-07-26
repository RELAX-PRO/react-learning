import React, { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

const MassiveArchiveWidget = () => {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("جاري تحميل الأرشيف من الخزنة العملاقة...");

  useEffect(() => {
    const loadArchive = async () => {
      const savedRecords = await get('clinic_massive_archive');
      if (savedRecords) {
        setRecords(savedRecords);
        setStatus("✅ تم تحميل الأرشيف بنجاح!");
      } else {
        setStatus("⚠️ الخزنة فارغة حالياً.");
      }
    };
    
    loadArchive();
  }, []);

  const addRecord = async () => {
    const newRecord = { id: Date.now(), patient: "مريض جديد", diagnosis: "فحص نظر دوري" };
    const updatedList = [newRecord, ...records];
    
    setRecords(updatedList);
    setStatus("💾 جاري الحفظ في الخلفية...");

    await set('clinic_massive_archive', updatedList);
    setStatus("✅ تم حفظ السجل في الخزنة العملاقة IndexedDB!");
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono max-w-md mx-auto">
      <h3 className="text-cyan-400 font-bold mb-2">🐘 أرشيف العيادة (IndexedDB)</h3>
      <p className="text-xs text-amber-400 mb-4">{status}</p>

      <button 
        onClick={addRecord}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-sm mb-4 transition cursor-pointer"
      >
        ➕ إضافة سجل طبي جديد للأرشيف
      </button>

      <div className="max-h-40 overflow-y-auto space-y-2 border-t border-slate-800 pt-2 text-xs text-slate-300">
        {records.map(rec => (
          <div key={rec.id} className="p-2 bg-slate-950 rounded border border-slate-800">
            <strong>👤 {rec.patient}:</strong> {rec.diagnosis}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MassiveArchiveWidget;