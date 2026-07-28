import React, {useRef} from "react";
// Example of useRef with a DOM element
// 1. تعريف السلك وإخباره بأنه سيتصل بحقل إدخال نصي (HTMLInputElement)
const barcodeInputRef = useRef<HTMLInputElement>(null);

const focusOnBarcode = () => {
  // 2. حماية إلزامية: المتصفح قد يطلب التركيز قبل رسم الشاشة، لذلك نفحص الـ current
  if (barcodeInputRef.current) {
    barcodeInputRef.current.focus();
  }
};

const BarcodeInput = () => {
  return <input ref={barcodeInputRef} type="text" placeholder="امسح باركود الإطار..." />;
};

//Example of useRef with a timer
// في المتصفح، المؤقت هو مجرد رقم (number)، أو قد يكون فارغاً في البداية (null)
const timerRef = useRef<number | null>(null);

const startCountdown = () => {
  // تنظيف المؤقت القديم إن وجد
  if (timerRef.current) window.clearTimeout(timerRef.current);
  
  // تشغيل مؤقت جديد وحفظ رقمه في السلك الصامت
  timerRef.current = window.setTimeout(() => {
    console.log("تم حفظ الفاتورة تلقائياً!");
  }, 3000);
};