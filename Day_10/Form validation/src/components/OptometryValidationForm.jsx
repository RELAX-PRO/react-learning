// =========================================================================
// File: src/components/OptometryValidationForm.jsx
// Description: Manual Clean Form Validation in Vanilla React
// =========================================================================
import React, { useState } from 'react';

export const OptometryValidationForm = () => {
  // 1. كائن حفظ مدخلات النموذج:
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    lensPower: "" // قوة العدسة (مثلاً: -1.50 أو +2.00)
  });

  // 2. كائن حفظ رسائل الأخطاء (يبدأ فارغاً تماماً):
  const [errors, setErrors] = useState({});

  // 3. المحرك العام لتحديث البيانات (Universal Handler):
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 💡 ميزة UX رائعة: مسح رسالة الخطأ فوراً بمجرد أن يبدأ المستخدم بتصحيح حقله!
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  // 4. دالة التحقق المركزية (The Validation Engine):
  const validateForm = () => {
    const newErrors = {}; // نبدأ بكائن أخطاء مؤقت

    // شرط 1: الاسم يجب ألا يقل عن 3 أحرف
    if (!formData.patientName.trim()) {
      newErrors.patientName = "اسم المريض مطلوب إجبارياً!";
    } else if (formData.patientName.trim().length < 3) {
      newErrors.patientName = "الاسم يجب أن يتكون من 3 أحرف على الأقل.";
    }

    // شرط 2: التحقق من صيغة البريد الإلكتروني عبر Regex بسيط
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب لإرسال الفاتورة!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صحيحة (مثال: name@domain.com).";
    }

    // شرط 3: قوة العدسة يجب أن تكون رقماً بین -20.00 و +20.00
    const powerNum = parseFloat(formData.lensPower);
    if (!formData.lensPower) {
      newErrors.lensPower = "يرجى إدخال قياس العدسة!";
    } else if (isNaN(powerNum) || powerNum < -20 || powerNum > 20) {
      newErrors.lensPower = "قياس العدسة يجب أن يكون رقماً واقعياً بين -20.00 و +20.00!";
    }

    // تحديث كائن الأخطاء في الشاشة
    setErrors(newErrors);

    // 🪄 السر: إذا كان كائن الأخطاء فارغاً، فهذا يعني أن النموذج سليم 100%!
    return Object.keys(newErrors).length === 0;
  };

  // 5. دالة الإرسال للسيرفر عند التقديم:
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isFormValid = validateForm();
    if (isFormValid) {
      console.log("✅ البيانات سليمـة 100%! جاري الإرسال للسيرفر...", formData);
      alert("تم حفظ بيانات المريض بنجاح! 👁️✨");
      // إعادة تصفير النموذج
      setFormData({ patientName: "", email: "", lensPower: "" });
    } else {
      console.log("❌ يوجد أخطاء في النموذج، تم إيقاف الإرسال!");
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🩺 تسجيل قياس النظر (مع التحقق)</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* --- FIELD 1: PATIENT NAME --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">اسم المريض:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="مثال: أحمد محمود"
            // تغيير لون الإطار للأحمر إذا كان هناك خطأ:
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.patientName ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {/* إظهار رسالة الخطأ إن وُجدت */}
          {errors.patientName && <p className="text-red-400 text-xs mt-1">⚠️ {errors.patientName}</p>}
        </div>

        {/* --- FIELD 2: EMAIL --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">البريد الإلكتروني:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="patient@optometry.com"
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.email ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">⚠️ {errors.email}</p>}
        </div>

        {/* --- FIELD 3: LENS POWER --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">قياس العدسة (SPH):</label>
          <input
            type="text"
            name="lensPower"
            value={formData.lensPower}
            onChange={handleChange}
            placeholder="مثال: -2.50 أو +1.25"
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.lensPower ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {errors.lensPower && <p className="text-red-400 text-xs mt-1">⚠️ {errors.lensPower}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-sm transition cursor-pointer mt-4"
        >
          ✅ اعتماد وحفظ القياس
        </button>
      </form>
    </div>
  );
};