// =========================================================================
// File: src/utils/optometryMath.ts
// Description: Pure utility functions for optometry calculations
// =========================================================================

export interface LensOrderInput {
  readonly basePriceUSD: number;
  readonly spherePower: number; // قياس النظر (مثلاً -2.50 أو +1.00)
  readonly hasBlueLightFilter: boolean;
}

/**
 * Calculates the total cost of a lens order based on medical complexity.
 * - High index lenses (sphere power <= -4.00 or >= +4.00) add a $50 complexity fee.
 * - Blue light filter adds a flat $30 fee.
 */
export function calculateLensOrderTotal(order: LensOrderInput): number {
  if (order.basePriceUSD < 0) {
    throw new Error("Base price cannot be negative!");
  }

  let total = order.basePriceUSD;

  // Medical complexity fee for high prescriptions
  if (order.spherePower <= -4.00 || order.spherePower >= 4.00) {
    total += 50;
  }

  // Optional Add-on
  if (order.hasBlueLightFilter) {
    total += 30;
  }

  return total;
}