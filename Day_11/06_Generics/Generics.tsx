// =========================================================================
// Lesson 5: Generics (<T>)
// =========================================================================
// Generics give us a great advantage: "Maximum flexibility with complete safety".
// Instead of using 'any' which destroys TypeScript's safety, we use <T> to represent "an unknown type that will be determined later".

// ❌ The bad first way: Using any (A cyber and engineering disaster!)
function getFirstElementBad(array: any[]): any {
  return array[0];
}

// When we call it and pass a list of strings, the engine becomes completely blind:
const badResult = getFirstElementBad(["Ahmed", "Sarah"]);
// The engine thinks badResult is any! Therefore if you type badResult. and ask for a non-existent function,
// the editor won't stop you, the code will run and explode in the user's face! 💥

// =========================================================================

// ✅ The excellent second way: Using Generics <T> (Super Intelligence!)
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

// 🪄 Look at the magic now:
const goodResult = getFirstElement(["Ahmed", "Sarah"]); 
// The engine automatically inferred that T is (string)! So it knows the variable goodResult is 100% a string!
// It will give you all string functions in VS Code like (toUpperCase) and eliminates any chance of error! 🛡️

// It also works with numbers automatically without needing to duplicate the code:
const firstNumber = getFirstElement([10, 20, 30]); // Inferred that T is (number)
