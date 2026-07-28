// =========================================================================
// الدرس الثاني: إنشاء العقود (Interfaces)
// =========================================================================
// الواجهات (Interfaces) هي عقود أو قوالب (Blueprints) تفرض شكل معين على البيانات (الكائنات - Objects).

// 1. العقد الأساسي:
interface Patient {
  readonly id: string;           // 👈 قفل الحماية الصارم (readonly): لا يمكن تعديله بعد إنشائه!
  fullName: string;              // 👈 إجباري
  phone: string;                 // 👈 إجباري
  secondaryPhone?: string;       // 👈 اختياري (استخدام علامة الاستفهام يعني يمكن أن يكون غير موجود)
  medicalNotes?: string;         // 👈 اختياري
}

// 2. تطبيق العقد بثقة مطلقة:
let firstPatient: Patient = {
  id: "PAT-8842",
  fullName: "سارة علي",
  phone: "+201234567890",
  // لاحظ أنه لم يتم توفير secondaryPhone أو medicalNotes وهذا مقبول لأنها اختيارية
};

// =========================================================================
// 🚨 حماية القراءة فقط (Readonly)
// =========================================================================
firstPatient.fullName = "سارة علي محمود"; // ✅ مقبول: تغيير الاسم مسموح به
// firstPatient.id = "PAT-9999";         // 🛑 مرفوض! سيعترض VS Code لأن الـ id هو readonly ولا يمكن تعديله!

// =========================================================================
// 3. الوراثة في العقود (Extending Interfaces):
// =========================================================================
// يمكن لواجهة أن ترث (تأخذ) جميع خصائص واجهة أخرى وتضيف عليها لتجنب تكرار الكود.

interface BasePerson {
  readonly id: string;
  fullName: string;
  phoneNumber: string;
}

// عقد مريض العيون يرث من BasePerson ويضيف معلومات فحص النظر
interface OptometryPatient extends BasePerson {
  lastEyeExamDate: string;
  sphereRightEye: number;
}

// عقد الطبيب يرث أيضاً ويضيف خصائصه المهنية
interface Doctor extends BasePerson {
  // استخدام Literal Types: يعني القيمة يجب أن تكون واحدة من هذه الكلمات حرفياً
  specialty: "Retina" | "Pediatric" | "General Optometry"; 
  licenseNumber: string;
}
