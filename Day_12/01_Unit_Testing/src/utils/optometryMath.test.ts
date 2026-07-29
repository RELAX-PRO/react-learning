// =========================================================================
// File: src/utils/optometryMath.test.ts
// Description: Comprehensive Unit Tests using Vitest / Jest syntax
// =========================================================================
import { describe, it, expect } from 'vitest';
import { calculateLensOrderTotal, LensOrderInput } from './optometryMath';

// describe: A container that groups all tests related to this function into one block
describe('calculateLensOrderTotal() - Optometry Billing Unit Tests', () => {

  // 🟢 Test 1: The Happy Path scenario
  it('should correctly calculate the total for a normal prescription without add-ons', () => {
    // 1. ARRANGE (Preparation)
    const normalOrder: LensOrderInput = {
      basePriceUSD: 100,
      spherePower: -1.50, // Normal measurement, doesn't require a complex lens
      hasBlueLightFilter: false
    };

    // 2. ACT (Execution)
    const finalPrice = calculateLensOrderTotal(normalOrder);

    // 3. ASSERT (Verification)
    // We expect the final price to be 100 dollars without any add-ons
    expect(finalPrice).toBe(100);
  });

  // 🟡 Test 2: Complex prescription scenario with blue light filter
  it('should add both the $50 complexity fee and $30 blue light fee for high prescriptions', () => {
    // 1. ARRANGE
    const complexOrder: LensOrderInput = {
      basePriceUSD: 100,
      spherePower: -5.50, // Very high measurement requiring a complexity fee ($50)
      hasBlueLightFilter: true // Add-on ($30)
    };

    // 2. ACT
    const finalPrice = calculateLensOrderTotal(complexOrder);

    // 3. ASSERT
    // 100 (Base) + 50 (Complexity) + 30 (Blue Light) = 180
    expect(finalPrice).toBe(180);
  });

  // 🔴 Test 3: Checking protection against corrupted data (Error Assertions)
  it('should throw an error if a negative base price is passed', () => {
    // 1. ARRANGE
    const corruptedOrder: LensOrderInput = {
      basePriceUSD: -50, // Impossible price medically and commercially!
      spherePower: -1.00,
      hasBlueLightFilter: false
    };

    // 2 & 3. ACT & ASSERT (For errors, we pass a callback function to expect() to check for the explosion)
    expect(() => {
      calculateLensOrderTotal(corruptedOrder);
    }).toThrow("Base price cannot be negative!");
  });

});