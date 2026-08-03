/**
 * Block Comment: const behavior
 * The 'const' keyword is used to declare variables whose references cannot be changed after initialization.
 * In memory, it creates an immutable binding. For primitive types (like strings and numbers), this means
 * the value itself cannot be changed. For reference types (like objects and arrays), it means the variable 
 * will always point to the same object in memory, but the contents of that object can still be mutated.
 * This ensures safer code by preventing accidental reassignments while allowing data structures to remain flexible.
 */
// 1. Primitive Type with const (Immutable)
const userName = "Ahmed"; // Primitive string, value is completely locked.
// userName = "Ali"; // TypeError: Assignment to constant variable.

// 2. Reference Type with const (The memory reference is constant, but the content is mutable)
const userProfile = { // Object stored in heap memory. 'userProfile' stores a constant reference to it.
  name: "Sara",
  age: 24,
  role: "Developer"
};

// Modifying an internal property is allowed
userProfile.age = 25; 
userProfile.role = "Senior Developer";
console.log(userProfile.age); // Output: 25

// Reassigning the entire object results in an error
/* userProfile = { 
  name: "Khalid", 
  age: 30 
}; // TypeError: Assignment to constant variable.
*/

// 3. Arrays with const
const techStack = ["HTML", "CSS"];
techStack.push("JavaScript"); // Allowed: Array is now ["HTML", "CSS", "JavaScript"]
// techStack = ["React", "Next.js"]; // TypeError: Cannot reassign the whole array.
