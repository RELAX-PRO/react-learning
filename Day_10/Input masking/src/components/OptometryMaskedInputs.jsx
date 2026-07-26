// =========================================================================
// File: src/components/OptometryMaskedInputs.jsx
// Description: Manual Input Masking in React without external libraries
// =========================================================================
import React, { useState } from 'react';

export const OptometryMaskedInputs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [frameSerial, setFrameSerial] = useState("");

  // 1. قناع رقم الهاتف العراقي (مثال: 0790-123-4567)
  const handlePhoneMask = (e) => {
    // أ: تنظيف النص من أي شيء ليس رقماً
    const rawDigits = e.target.value.replace(/\D/g, '');

    // ب: منع تجاوز 11 رقماً
    const trimmed = rawDigits.slice(0, 11);

    // ج: التشكيل الديناميكي بناءً على طول النص
    let formatted = trimmed;
    if (trimmed.length > 7) {
      // بعد الرقم السابع: 0790-123-4567
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 4) {
      // بعد الرقم الرابع: 0790-123
      formatted = `${trimmed.slice(0, 4)}-${trimmed.slice(4)}`;
    }

    setPhoneNumber(formatted);
  };

  // 2. قناع الرمز التسلسلي للنظارة (مثال: OPT-2026-8842)
  const handleSerialMask = (e) => {
    // أ: تنظيف النص والإبقاء على الأرقام والحروف فقط مع تحويلها لـ Capital
    const rawAlphaNum = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const trimmed = rawAlphaNum.slice(0, 11); // 3 letters + 4 year digits + 4 code digits

    let formatted = trimmed;
    if (trimmed.length > 7) {
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
    } else if (trimmed.length > 3) {
      formatted = `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    }

    setFrameSerial(formatted);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🎭 أقنعة التنسيق الحية (Input Masking)</h2>

      <div className="space-y-6">
        {/* --- FIELD 1: PHONE MASK --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">رقم هاتف المريض (تنسيق تلقائي):</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneMask}
            placeholder="0790-000-0000"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm tracking-wider focus:border-cyan-500 focus:outline-none transition"
          />
          <span className="text-[10px] text-slate-500 block mt-1">
            القيمة المحفوظة في الذاكرة: <code className="text-emerald-400">"{phoneNumber}"</code>
          </span>
        </div>

        {/* --- FIELD 2: FRAME SERIAL MASK --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">الرمز التسلسلي للإطار (Serial Code):</label>
          <input
            type="text"
            value={frameSerial}
            onChange={handleSerialMask}
            placeholder="OPT-2026-XXXX"
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm tracking-wider focus:border-cyan-500 focus:outline-none transition"
          />
          <span className="text-[10px] text-slate-500 block mt-1">
            يتحول تلقائياً لحروف كبيرة ويعزل المقاطع بالشرطة!
          </span>
        </div>
      </div>
    </div>
  );
};