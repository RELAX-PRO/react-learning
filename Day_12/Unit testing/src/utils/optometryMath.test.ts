// =========================================================================
// File: src/utils/optometryMath.test.ts
// Description: Comprehensive Unit Tests using Vitest / Jest syntax
// =========================================================================
import { describe, it, expect } from 'vitest'; // أو من 'jest'
import { calculateLensOrderTotal, LensOrderInput } from './optometryMath';

// describe: حاوية تجمع كل الاختبارات الخاصة بهذه الدالة في تقرير واحد
describe('calculateLensOrderTotal() - Optometry Billing Unit Tests', () => {

  // 🟢 الاختبار الأول: السيناريو الطبيعي (Happy Path)
  it('should correctly calculate the total for a normal prescription without add-ons', () => {
    // 1. ARRANGE (التجهيز)
    const normalOrder: LensOrderInput = {
      basePriceUSD: 100,
      spherePower: -1.50, // قياس طبيعي لا يتطلب عدسة معقدة
      hasBlueLightFilter: false
    };

    // 2. ACT (التنفيذ)
    const finalPrice = calculateLensOrderTotal(normalOrder);

    // 3. ASSERT (التحقق)
    // نتوقع أن يكون السعر النهائي 100 دولار بدون أي إضافات
    expect(finalPrice).toBe(100);
  });

  // 🟡 الاختبار الثاني: سيناريو الوصفة المعقدة مع الحماية الزرقاء
  it('should add both the $50 complexity fee and $30 blue light fee for high prescriptions', () => {
    // 1. ARRANGE
    const complexOrder: LensOrderInput = {
      basePriceUSD: 100,
      spherePower: -5.50, // قياس مرتفع جداً يستدعي رسوم تعقيد ($50)
      hasBlueLightFilter: true // إضافية ($30)
    };

    // 2. ACT
    const finalPrice = calculateLensOrderTotal(complexOrder);

    // 3. ASSERT
    // 100 (أساسي) + 50 (تعقيد) + 30 (حماية زرقاء) = 180
    expect(finalPrice).toBe(180);
  });

  // 🔴 الاختبار الثالث: فحص الحماية من البيانات الفاسدة (Error Assertions)
  it('should throw an error if a negative base price is passed', () => {
    // 1. ARRANGE
    const corruptedOrder: LensOrderInput = {
      basePriceUSD: -50, // سعر مستحيل طبياً وتجارياً!
      spherePower: -1.00,
      hasBlueLightFilter: false
    };

    // 2 & 3. ACT & ASSERT (في الأخطاء، نمرر الدالة داخل توقع متصل للتحقق من الانفجار)
    expect(() => {
      calculateLensOrderTotal(corruptedOrder);
    }).toThrow("Base price cannot be negative!");
  });

});