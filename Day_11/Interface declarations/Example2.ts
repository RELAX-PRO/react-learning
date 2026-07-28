interface patient {
  readonly id: string;         // 👈 قفل الحماية الصارم!
  readonly nationalId: number; 
  fullName: string;            // 👈 هذا يمكن تعديله لاحقاً عادي
}

let patient: patient = { id: "OPT-1", nationalId: 998877, fullName: "علي خالد" };

// المبرمج يحاول تعديل الاسم لاحقاً:
patient.fullName = "علي خالد محمود"; // ✅ مقبول ويعمل بدون مشاكل

// المبرمج يحاول بالخطأ تغيير رقم الهوية أو الـ ID:
patient.id = "OPT-20"; 
// 🛑 صراخ VS Code فوراً: Cannot assign to 'id' because it is a read-only property!