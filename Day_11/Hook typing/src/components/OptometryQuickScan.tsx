// =========================================================================
// File: src/components/OptometryQuickScan.tsx
// Description: Mastering useState and useRef Generics in Next.js
// =========================================================================
import React, { useState, useRef, useEffect } from 'react';

interface ScannedFrame {
  readonly barcode: string;
  modelName: string;
  priceUSD: number;
}

export const OptometryQuickScan = () => {
  // 1. Smart Inference (TS infers boolean and string automatically)
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 2. Explicit Generic for an Array State (Prevents the never[] trap!)
  const [scannedList, setScannedList] = useState<ScannedFrame[]>([]);

  // 3. Explicit Generic for DOM Reference (Mandatory null initial value)
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input automatically when scanning starts
  useEffect(() => {
    if (isScanning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isScanning]);

// ❌ الطريقة القديمة المعتمدة في بيئات العمل القديمة (React 17 وما قبلها):
// const HandleAddBarcode = (e: React.FormEvent<HTMLFormElement>) => { ... }

// =========================================================================

// ✅ الطريقة القياسية الحديثة المعتمدة في أحدث بيئات العمل:
const handleAddBarcode = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (!inputRef.current || !inputRef.current.value) {
    setErrorMessage("الرجاء إدخال باركود صحيح!");
    return;
  }

    const newFrame: ScannedFrame = {
      barcode: inputRef.current.value,
      modelName: "إطار إيطالي مخصص", // Simulated data
      priceUSD: 120
    };

    // Safely updating array state
    setScannedList((prevList) => [...prevList, newFrame]);
    
    // Resetting DOM input directly via ref
    inputRef.current.value = "";
    setErrorMessage("");
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-cyan-400 font-bold">📡 الماسح الضوئي للإطارات</h3>
        <button
          type="button"
          onClick={() => setIsScanning(!isScanning)}
          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
            isScanning ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300"
          }`}
        >
          {isScanning ? "إيقاف المسح ⏹️" : "بدء المسح 🚀"}
        </button>
      </div>

      {isScanning && (
        <form onSubmit={handleAddBarcode} className="space-y-2 animate-fade-in">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="امسح أو اكتب باركود الإطار هنا..."
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 px-4 rounded-xl text-sm font-bold transition cursor-pointer shrink-0"
            >
              إضافة ➕
            </button>
          </div>
          {errorMessage && <p className="text-red-400 text-xs font-bold">{errorMessage}</p>}
        </form>
      )}

      {/* Scanned Items List */}
      <div className="space-y-2 border-t border-slate-800 pt-4">
        <p className="text-xs text-slate-400">الإطارات المسجلة في هذه الجلسة ({scannedList.length}):</p>
        {scannedList.length === 0 ? (
          <p className="text-xs text-slate-600 italic text-center py-4">[ القائمة فارغة حالياً ]</p>
        ) : (
          scannedList.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-lg flex justify-between items-center text-xs border border-slate-800">
              <span className="text-slate-300">{item.modelName} <code className="text-cyan-400">({item.barcode})</code></span>
              <span className="text-emerald-400 font-bold">${item.priceUSD}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};