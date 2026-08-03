/**
 * ==========================================
 * UNDERLYING MECHANICS: EQUALITY ASSERTIONS
 * ==========================================
 * Vitest/Jest provide different ways to check equality:
 * - `toBe`: Checks for referential identity (using `Object.is`). It works well for primitives but fails for identical objects with different memory addresses.
 * - `toEqual`: Recursively checks all properties of an object (deep equality). It's the correct way to compare objects and arrays.
 */
//@ts-ignore
expect(20 + 30).toBe(50); // ✅ Passes successfully

//@ts-ignore
expect("Yusr Clinic").toBe("Yusr Clinic"); // ✅ Passes successfully

const patient1 = { id: "P-101", name: "Ahmed" };
const patient2 = { id: "P-101", name: "Ahmed" };

//@ts-ignore
// ❌ The terminal explodes in red and says: Failed!
expect(patient1).toBe(patient2);

// @ts-ignore
// ✅ Passes with flying colors because it compares the internal content of the objects!
expect(patient1).toEqual(patient2);
