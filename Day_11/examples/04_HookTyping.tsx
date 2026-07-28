// =========================================================================
// الدرس الرابع: تعريف أنواع الـ Hooks في React
// =========================================================================
import React, { useState, useRef } from "react";

// -------------------------------------------------------------------------
// 1. كتابة أنواع useState (Typing useState)
// -------------------------------------------------------------------------

interface LensItem {
  id: string;
  brand: string;
  price: number;
}

export function StateExample() {
  // ✅ باستخدام <LensItem[]> نخبر React أن هذه المصفوفة الفارغة ستستقبل مستقبلاً عناصر من نوع LensItem فقط!
  const [lenses, setLenses] = useState<LensItem[]>([]);

  interface PatientProfile {
    name: string;
    sphereRight: number;
  }

  // 🪄 السحر: المتغير قد يحتوي على كائن المريض، أو قد يكون null (فارغ) قبل تحميل البيانات.
  const [activePatient, setActivePatient] = useState<PatientProfile | null>(null);

  return (
    <div>
      {/* عند قراءة البيانات، تجبرك TypeScript على استخدام علامة الاستفهام (?. Optional Chaining) للحماية من انهيار الشاشة إذا كان null */}
      <p>اسم المريض: {activePatient?.name || "غير متوفر"}</p>
    </div>
  );
}

// -------------------------------------------------------------------------
// 2. كتابة أنواع useRef (Typing useRef)
// -------------------------------------------------------------------------

export function RefExample() {
  // الاستخدام الأول: ربط useRef بعنصر في الشاشة (DOM Element)
  // نخبر TypeScript أنه سيتصل بحقل إدخال HTML عبر <HTMLInputElement> ونبدأه بـ null
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const focusOnBarcode = () => {
    // حماية إلزامية: نفحص الـ current لأنه قد يكون null قبل رسم الشاشة
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };

  // الاستخدام الثاني: الاحتفاظ بقيمة خلف الكواليس (مثل مؤقت Timer)
  // في المتصفح، المؤقت هو مجرد رقم (number)، أو قد يكون فارغاً (null)
  const timerRef = useRef<number | null>(null);

  const startCountdown = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current); // تنظيف القديم
    
    // تشغيل مؤقت جديد وحفظ رقمه
    timerRef.current = window.setTimeout(() => {
      console.log("تم الإجراء تلقائياً!");
    }, 3000);
  };

  return (
    <div>
      <input ref={barcodeInputRef} type="text" placeholder="امسح الباركود..." />
      <button onClick={focusOnBarcode}>التركيز على الحقل</button>
      <button onClick={startCountdown}>بدء المؤقت</button>
    </div>
  );
}
