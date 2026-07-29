// =========================================================================
// File: src/components/OpticsBarcodeScannerModal.tsx
// Description: A heavy component simulating barcode camera scanning
// =========================================================================
import React, { useEffect } from 'react';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onBarcodeDetected: (barcode: string) => void;
}

export const OpticsBarcodeScannerModal = ({ isOpen, onClose, onBarcodeDetected }: Props) => {
  useEffect(() => {
    console.log("📸 [Heavy Module Loaded]: تم تحميل مكتبة الكاميرا ومعالجة الصور في المتصفح الآن!");
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full text-white font-mono space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-cyan-400 font-bold">👁️ الماسح الضوئي الذكي لعدسات المتجر</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>

        {/* محاكاة شاشة كاميرا */}
        <div className="h-48 bg-slate-950 border-2 border-dashed border-cyan-500/50 rounded-xl flex flex-col items-center justify-center text-xs text-slate-400">
          <span className="animate-pulse">🔴 جاري قراءة الباركود من الكاميرا...</span>
          <p className="mt-2 text-[10px] text-slate-600">[ عتاد الكاميرا مفعل ]</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onBarcodeDetected("RAY-BAN-TITANIUM-2026")}
            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold transition"
          >
            محاكاة التقاط باركود ناجح ✅
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

// في next/dynamic يفضل دائماً أن يكون المكون مصدراً كـ default
export default OpticsBarcodeScannerModal;