// 1. Primitive Type with const (Immutable)
const userName = "Ahmed";
// userName = "Ali"; // TypeError: Assignment to constant variable.

// 2. Reference Type with const (The memory reference is constant, but the content is mutable)
const userProfile = {
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
