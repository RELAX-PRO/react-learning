// =========================================================================
// Lesson 7: Automatic Type Inference
// =========================================================================
// TypeScript is very smart, you don't always need to write the type manually. If you give it an initial value, it will know the type immediately.

// 1. The engine looks at the value and automatically infers that the type is string:
let inferredString = "Ahmed Mahmoud"; 

// 2. The engine looks at the number 35 and infers that the type is number:
let inferredNumber = 35;

// =========================================================================
// 🚨 What happens if we try to trick it later?
// =========================================================================
// inferredString = 100; 
// 🛑 Immediate VS Code Error: Type 'number' is not assignable to type 'string'!
// (Even though we never wrote `: string`! The engine memorized the type from the first moment!)


// 3. Array Inference:
// The engine sees numbers and strings inside the array, so it infers the type is a mix: (string | number)[]
let clinicScores = [10, 20, "Excellent", 30, "Very Good"];

clinicScores.push(50);       // ✅ Acceptable (number)
clinicScores.push("Poor");    // ✅ Acceptable (string)
// clinicScores.push(true);  // 🛑 Rejected! Because boolean is not among the previously inferred types!


// 4. Function Return Inference:
// The engine reads the subtraction function and knows immediately the result will be a number, so it infers the function returns: number
function calculateLensDiscount(price: number, discount: number) {
  return price - discount; 
}

const finalPrice = calculateLensDiscount(200, 50);
// finalPrice is now programmatically stamped as a number without any intervention from you! 🪄


// 5. Inference in React (Events):
// The engine knows onChange belongs to an input, so it infers the event type (e) directly without you writing React.ChangeEvent!
export function ExampleComponent() {
  return <input onChange={(e) => console.log(e.target.value)} placeholder="Type here..." />;
}
