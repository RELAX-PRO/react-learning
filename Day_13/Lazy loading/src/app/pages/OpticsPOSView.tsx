// =========================================================================
// File: src/app/OpticsPOSView.tsx
// Description: Mastering next/dynamic for high-performance code splitting
// =========================================================================
import React, { useState } from 'react';
//@ts-ignore
import dynamic from 'next/dynamic';

// =========================================================================
// 🚀 LAZY IMPORT MAGIC (next/dynamic)
// هنا لا يتدخل كود الماسح في حزمة الصفحة الأساسية أبداً!
// يتم استدعاؤه كحزمة مستقلة فقط عند الحاجة إليه.
// =========================================================================
const LazyBarcodeScannerModal = dynamic(
  () => import('../../components/OpticsBarcodeScannerModal'),
  {
    // 1. شاشة التحميل البديلة التي تظهر في الميلي ثوانٍ أثناء جلب ملف الجافاسكريبت
    loading: () => (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-mono text-xs text-cyan-400">
        ⏳ جاري تحميل مكتبات الكاميرا والماسح الضوئي من السيرفر...
      </div>
    ),
    // 2. تعطيل العرض السيرفري لأن كاميرا المتصفح لا توجد في السيرفر!
    ssr: false,
  }
);

export const OpticsPOSView = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedItem, setScannedItem] = useState<string | null>(null);

  const handleBarcodeFound = (barcode: string) => {
    setScannedItem(barcode);
    setIsScannerOpen(false);
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white font-mono flex flex-col items-center justify-center gap-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full text-center space-y-4 shadow-2xl">
        <h1 className="text-lg font-bold text-cyan-400">👓 نظام مبيعات متجر البصريات</h1>
        <p className="text-xs text-slate-400">
          هذه الصفحة خفيفة جداً وسريعة؛ لم نقم بتحميل أي كود ثقيل بعد!
        </p>

        {/* الزر الذي سيحفز تحميل المكون من السيرفر عند الضغط عليه */}
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-600/20 cursor-pointer"
        >
          📷 تشغيل ماسح الباركود بالكاميرا (Lazy Load)
        </button>

        {scannedItem && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
            ✓ تم التقاط المنتج: <strong className="font-bold">{scannedItem}</strong>
          </div>
        )}
      </div>

      {/* 
        هنا السحر! هذا المكون لن يُطالب المتصفح بتحميل ملفه 
        إلا عندما تصبح isScannerOpen تساوي true!
      */}
      {isScannerOpen && (
        <LazyBarcodeScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onBarcodeDetected={handleBarcodeFound}
        />
      )}
    </div>
  );
};