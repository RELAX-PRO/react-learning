// 1. العقد الأساسي العام:
interface BasePerson {
  readonly id: string;
  fullName: string;
  phoneNumber: string;
}

// 2. عقد المريض يرث كل خصائص BasePerson ويضيف عليها:
interface OptometryPatient extends BasePerson {
  insuranceProvider?: string;
  lastEyeExamDate: string;
  sphereRightEye: number;
}

// 3. عقد الطبيب يرث أيضاً ويضيف خصائصه المهنية:
interface Doctor extends BasePerson {
  specialty: "Retina" | "Pediatric" | "General Optometry"; // Literal Types!
  licenseNumber: string;
}