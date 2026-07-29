// =========================================================================
// File: src/services/insuranceAnalyzer.test.ts
// Description: Mastering standard TypeScript Assertions in Vitest
// =========================================================================
import { describe, it, expect } from 'vitest';

// An object representing the insurance analysis result returned by our medical function
interface InsuranceReport {
  readonly patientId: string;
  readonly isEligible: boolean;
  readonly coveragePercentage: number;
  readonly allowedLensBrands: string[];
  readonly copayAmountUSD: number;
}

// A mock function to simulate the algorithm we want to test
function generateInsuranceReport(age: number, hasVIPInsurance: boolean): InsuranceReport {
  if (age < 0 || age > 120) {
    throw new Error("Patient age is medically illogical!");
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

  it('should apply all correct validation types for a VIP patient report', () => {
    // 1. ARRANGE & ACT
    const vipReport = generateInsuranceReport(30, true);

    // 2. ASSERTIONS (Comprehensive Expectations Court)

    // 🟢 Checking Primitives using toBe
    expect(vipReport.isEligible).toBe(true);
    expect(vipReport.coveragePercentage).toBe(100);
    expect(vipReport.copayAmountUSD).toBe(0);

    // 🔵 Checking the entire Object structure using toEqual
    expect(vipReport).toEqual({
      patientId: "PAT-2026",
      isEligible: true,
      coveragePercentage: 100,
      allowedLensBrands: ["Ray-Ban", "Gucci", "Zeiss"],
      copayAmountUSD: 0
    });

    // 🟡 Checking Arrays and Lists (Array Matchers)
    // Ensure the brands array contains "Zeiss" specifically without needing to know its order!
    expect(vipReport.allowedLensBrands).toContain("Zeiss");
    expect(vipReport.allowedLensBrands).toHaveLength(3); // Array length is 3 brands

    // 🟣 Checking Numeric Comparisons (Numeric Matchers)
    expect(vipReport.coveragePercentage).toBeGreaterThan(50); // Greater than 50%
    expect(vipReport.copayAmountUSD).toBeLessThanOrEqual(100); // Less than or equal to $100
  });

  it('should throw a strict error if an impossible age is passed for the patient (Error Assertion)', () => {
    // 🔴 Checking medical explosions and safeguards
    expect(() => {
      generateInsuranceReport(-5, false); // Negative age!
    }).toThrowError("Patient age is medically illogical!");
  });

});