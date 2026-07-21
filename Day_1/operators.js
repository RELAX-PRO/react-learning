// 1. Loose Equality (==) -> Dangerous Type Coercion!
console.log(5 == "5");        // Output: true (String "5" was converted to Number 5)
console.log(0 == false);      // Output: true (false was converted to 0)
console.log(null == undefined);// Output: true (Treated as equal in loose comparison)
console.log("" == 0);         // Output: true (Empty string became 0)

// 2. Strict Equality (===) -> Clean, Predictable, and Safe!
console.log(5 === "5");        // Output: false (Different types: Number vs String)
console.log(0 === false);      // Output: false (Number vs Boolean)
console.log(null === undefined);// Output: false (Null vs Undefined)

// 3. Same rules apply for Inequality:
// !=  (Loose inequality - Avoid)
// !== (Strict inequality - Always use this in React)

// 1. How AND (&&) works in JS:
let result1 = "Hello" && "World"; 
console.log(result1); // Output: "World" (First was truthy, so it returned the second!)

let result2 = 0 && "Apple";
console.log(result2); // Output: 0 (First was falsy, so it stopped and returned 0!)

// 🚀 WHY IS THIS CRITICAL IN REACT? 
// We use && to conditionally show components on the screen!
// Example from React: isLoggedIn && <UserProfile />
// If isLoggedIn is true, React renders <UserProfile />. If false, it renders nothing!

// 2. How OR (||) works in JS:
let result3 = "Majed" || "Guest";
console.log(result3); // Output: "Majed" (First was truthy, returned immediately!)

let result4 = "" || "Default User";
console.log(result4); // Output: "Default User" (First was empty/falsy, returned second!)

// 🚀 WHY IS THIS CRITICAL IN REACT?
// We use || to provide default fallback values for variables or UI text!

console.log("10" + 5); // Output: "105" (Concatenation: 5 became a string)
console.log("10" - 5); // Output: 5     (Subtraction: "10" became a number!)
console.log("10" * 2); // Output: 20    (Multiplication: "10" became a number!)

const A = (10 !== "10");
const B = ("" || "React");
const C = ("Hello" && 0 && "World");
console.log(A, B, C); // Output: true "React" 0