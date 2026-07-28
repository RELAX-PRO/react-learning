import { useState } from "react";
interface LensItem {
  id: string;
  brand: string;
  price: number;
}

// ✅ الآن المحرك يعرف أن المصفوفة فارغة حالياً، لكنها جاهزة لاستقبال عدسات!
const [lenses, setLenses] = useState<LensItem[]>([]);

interface PatientProfile {
  name: string;
  sphereRight: number;
  lastExamDate: string;
}

// 🪄 السحر: الذاكرة تقبل إما كائن المريض أو null
const [activePatient, setActivePatient] = useState<PatientProfile | null>(null);

// عند قراءة البيانات في الشاشة، تجبرك TS على وضع علامة الاستفهام للحماية من الانهيار:
<p>اسم المريض: {activePatient?.name}</p> // Optional Chaining