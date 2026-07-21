// 1. Primitive Type with const (Totally Immutable)
const userName = "Ahmed";
// userName = "Ali"; // ❌ TypeError: Assignment to constant variable.

// 2. Reference Type with const (The Memory Reference is constant, NOT the content!)
const userProfile = {
  name: "Sara",
  age: 24,
  role: "Developer"
};

// Modifying an internal property (MUTATION) -> This is ALLOWED in standard JS!
userProfile.age = 25; 
userProfile.role = "Senior Developer";
console.log(userProfile.age); // Output: 25 (It worked! No errors! 😲)

// BUT, trying to reassign the entire object -> ERROR!
/* userProfile = { 
  name: "Khalid", 
  age: 30 
}; // ❌ TypeError: Assignment to constant variable.
*/

// 3. Same rule applies to Arrays!
const techStack = ["HTML", "CSS"];
techStack.push("JavaScript"); // ✅ Allowed! Array is now ["HTML", "CSS", "JavaScript"]
// techStack = ["React", "Next.js"]; // ❌ Error! Cannot reassign the whole array.