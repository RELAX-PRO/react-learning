// =========================================================================
// File: src/services/insuranceAnalyzer.test.ts
// Description: Mastering standard TypeScript Assertions in Vitest
// =========================================================================
import { describe, it, expect } from 'vitest';

// كائن يمثل نتيجة تحليل التأمين التي تُرجعها دالتنا الطبية
interface InsuranceReport {
  readonly patientId: string;
  readonly isEligible: boolean;
  readonly coveragePercentage: number;
  readonly allowedLensBrands: string[];
  readonly copayAmountUSD: number;
}

// دالة وهمية لمحاكاة الخوارزمية التي نريد اختبارها
function generateInsuranceReport(age: number, hasVIPInsurance: boolean): InsuranceReport {
  if (age < 0 || age > 120) {
    throw new Error("عمر المريض غير منطقي طبياً!");
  }

  return {
    patientId: "PAT-2026",
    isEligible: true,
    coveragePercentage: hasVIPInsurance ? 100 : 70,
    allowedLensBrands: hasVIPInsurance ? ["Ray-Ban", "Gucci", "Zeiss"] : ["Standard Lens"],
    copayAmountUSD: hasVIPInsurance ? 0 : 45
  };
}

describe('generateInsuranceReport() - Comprehensive Assertions Suite', () => {

  it('يجب أن يطبق كل أنواع التحقق الصحيحة على تقرير مريض VIP', () => {
    // 1. ARRANGE & ACT
    const vipReport = generateInsuranceReport(30, true);

    // 2. ASSERTIONS (محكمة التوقعات الشاملة)

    // 🟢 فحص القيم البدائية (Primitives) باستخدام toBe
    expect(vipReport.isEligible).toBe(true);
    expect(vipReport.coveragePercentage).toBe(100);
    expect(vipReport.copayAmountUSD).toBe(0);

    // 🔵 فحص الهيكل والكائن بالكامل باستخدام toEqual (لأنه Object!)
    expect(vipReport).toEqual({
      patientId: "PAT-2026",
      isEligible: true,
      coveragePercentage: 100,
      allowedLensBrands: ["Ray-Ban", "Gucci", "Zeiss"],
      copayAmountUSD: 0
    });

    // 🟡 فحص المصفوفات والقوائم (Array Matchers)
    // التأكد أن مصفوفة الماركات تحتوي على "Zeiss" تحديداً دون الحاجة لمعرفة ترتيبها!
    expect(vipReport.allowedLensBrands).toContain("Zeiss");
    expect(vipReport.allowedLensBrands).toHaveLength(3); // طول المصفوفة 3 ماركات

    // 🟣 فحص المقارنات الرياضية (Numeric Matchers)
    expect(vipReport.coveragePercentage).toBeGreaterThan(50); // أكبر من 50%
    expect(vipReport.copayAmountUSD).toBeLessThanOrEqual(100); // أصغر من أو يساوي 100$
  });

  it('يجب أن يطلق خطأ صارماً إذا تم تمرير عمر مستحيل للمريض (Error Assertion)', () => {
    // 🔴 فحص الانفجارات الطبية والحماية
    expect(() => {
      generateInsuranceReport(-5, false); // عمر سالب!
    }).toThrowError("عمر المريض غير منطقي طبياً!");
  });

});