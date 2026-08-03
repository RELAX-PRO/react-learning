// =========================================================================
// Lesson 1: Primitive Type Annotations
// =========================================================================
// In TypeScript, we can enforce variables to accept only one specific data type.
// This protects us from unexpected errors while running the application.

/*
 * MECHANIC: String Annotations
 * By defining `: string`, we force the compiler to only accept string values.
 */
// 1. Strings (string): Accepts characters and text only.
let patientName: string = "Ahmed Mahmoud"; // Inline: string restricts this to text only
let frameModel: string = "Ray-Ban Aviator";

/*
 * MECHANIC: Number Annotations
 * The `: number` type in TS covers all numerical values (integers, floats, negative numbers, etc.).
 * It corresponds to the double-precision 64-bit floating point format used in JS.
 */
// 2. Numbers (number): Accepts integers, decimals, or negative numbers.
let patientAge: number = 35; // Inline: Age strictly accepts numeric values
let lensSpherePower: number = -2.50; // Negative vision measurement
let framePriceUSD: number = 150;

/*
 * MECHANIC: Boolean Annotations
 * The `: boolean` type allows strictly true or false values.
 */
// 3. Booleans (boolean): Accepts true or false only.
let hasHealthInsurance: boolean = true; // Inline: explicit boolean flag
let isFirstVisit: boolean = false;

// =========================================================================
// 🚨 What happens if we try to break the rules? (Try uncommenting to see the error)
// =========================================================================

// The developer mistakenly tries to put text inside a numeric variable:
// lensSpherePower = "Very Strong"; 
// 🛑 Immediate VS Code Error: Type 'string' is not assignable to type 'number'.

// The developer tries to call a string method on a boolean variable:
// console.log(hasHealthInsurance.toUpperCase());
// 🛑 Immediate VS Code Error: Property 'toUpperCase' does not exist on type 'boolean'.
