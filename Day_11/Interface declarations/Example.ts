// 1. إنشاء العقد (Blueprint):
interface Patient {
  id: string;
  fullName: string;
  age: number;
  isInsured: boolean;
}
interface Patient {
  fullName: string;
  phone: string;          // 👈 إجباري
  secondaryPhone?: string; // 👈 اختياري (قد يكون string أو undefined)
  medicalNotes?: string;   // 👈 اختياري
}

// 2. تطبيق العقد بثقة مطلقة:
let firstPatient: Patient = {
  id: "PAT-8842",
  fullName: "سارة علي",
  age: 28,
  isInsured: true,
  phone: "+201234567890",
  medicalNotes: "لا توجد ملاحظات طبية."
};
