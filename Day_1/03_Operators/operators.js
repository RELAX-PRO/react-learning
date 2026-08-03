/**
 * Block Comment: Operators and Type Coercion
 * JavaScript operators not only perform standard mathematical and logical operations, but 
 * they often trigger implicit type coercion (converting data from one type to another).
 * '==' performs loose equality checking and will attempt to coerce types before comparing, 
 * whereas '===' performs strict equality checking (no coercion) which is generally safer.
 * Logical operators like '&&' and '||' also evaluate truthiness and can short-circuit, 
 * returning the first definitive value they encounter.
 */

// 1. Loose Equality (==)
console.log(5 == "5");        // Output: true (String "5" converted to Number 5)
console.log(0 == false);      // Output: true (false converted to 0)
console.log(null == undefined);// Output: true
console.log("" == 0);         // Output: true

// 2. Strict Equality (===) - Recommended approach
console.log(5 === "5");        // Output: false (Different types: Number vs String)
console.log(0 === false);      // Output: false (Number vs Boolean)
console.log(null === undefined);// Output: false (Null vs Undefined)

// Inequality:
// !=  (Loose inequality)
// !== (Strict inequality - Preferred in React)

// 1. Logical AND (&&)
let result1 = "Hello" && "World"; // Both strings are truthy. 
console.log(result1); // Output: "World" (First is truthy, evaluates second)

let result2 = 0 && "Apple"; // 0 is inherently falsy.
console.log(result2); // Output: 0 (First is falsy, short-circuits)

// In React, && is used for conditional rendering:
// Example: isLoggedIn && <UserProfile />

// 2. Logical OR (||)
let result3 = "Majed" || "Guest";
console.log(result3); // Output: "Majed" (First is truthy, short-circuits)

let result4 = "" || "Default User";
console.log(result4); // Output: "Default User" (First is falsy, evaluates second)

// In React, || is often used to provide fallback values.

console.log("10" + 5); // Output: "105" (Concatenation)
console.log("10" - 5); // Output: 5     (Subtraction: string coerced to number)
console.log("10" * 2); // Output: 20    (Multiplication)

const conditionA = (10 !== "10");
const conditionB = ("" || "React");
const conditionC = ("Hello" && 0 && "World");
console.log(conditionA, conditionB, conditionC); // Output: true "React" 0
