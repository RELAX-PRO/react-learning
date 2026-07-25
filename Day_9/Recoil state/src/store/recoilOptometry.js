// =========================================================================
// ملف التعريف: src/store/recoilOptometry.js (أسلوب Recoil القديم من Meta)
// =========================================================================
import { atom, selector } from 'recoil';

// 1. الذرة الأساسية (لاحظ أننا مجبرون على كتابة key وتسمية القيمة default):
export const eyePowerState = atom({
  key: 'eyePowerState', // 👈 المزعج: لو تكرر هذا النص في ملف آخر سينفجر التطبيق!
  default: -1.50,
});

// 2. الذرة المشتقة (سموها هنا selector بدلاً من atom):
export const diagnosticState = selector({
  key: 'diagnosticState',
  get: ({ get }) => {
    const power = get(eyePowerState);
    return power <= -3.00 ? "🔴 High Myopia" : "🟢 Mild Myopia";
  }
});