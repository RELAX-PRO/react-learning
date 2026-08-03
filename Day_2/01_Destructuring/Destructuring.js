/*
  =========================================
  DESTRUCTURING MECHANICS IN JAVASCRIPT
  =========================================
  Destructuring is a JavaScript expression that makes it possible to unpack values 
  from arrays, or properties from objects, into distinct variables.
  
  Under the hood, object destructuring looks up the property by its key and 
  binds its value to a variable of the same name (or an alias). If the value 
  is strictly `undefined`, it can fall back to a default value.
*/

// A standard user profile object returned from a database or API.
const developerProfile = {
  username: "Majed",
  role: "Frontend Engineer",
  experienceYears: 3,
  country: "Iraq"
};

// --- Pre-ES6 Approach ---
// Accessing properties required repeating the object reference.
const oldUser = developerProfile.username;
const oldRole = developerProfile.role;
const oldExp = developerProfile.experienceYears;

// --- Modern Object Destructuring ---
// Extracting properties into variables in a single statement.
// The variable names must match the object keys; the order is irrelevant.
const { role, experienceYears, username } = developerProfile; // Unpacking object properties

console.log(username);        // Output: "Majed"
console.log(role);            // Output: "Frontend Engineer"
console.log(experienceYears); // Output: 3

// --- Advanced Object Destructuring ---

/*
  RENAMING AND DEFAULTS:
  The syntax `sourceKey: targetVariable` renames the binding.
  The syntax `key = defaultValue` provides a default.
  They can be combined as `sourceKey: targetVariable = defaultValue`.
*/

// 1. Renaming variables during destructuring
// Useful for avoiding variable name collisions or improving readability.
const { experienceYears: exp, country: userLocation } = developerProfile; // 'experienceYears' is accessed and assigned to 'exp'
console.log(exp);          // Output: 3
console.log(userLocation); // Output: "Iraq"

// 2. Assigning Default Values
// Provides a fallback value if the property is undefined in the object.
const { username: name, accountStatus = "Active" } = developerProfile; // Renames 'username' to 'name' and defaults 'accountStatus'
console.log(accountStatus); // Output: "Active"

// Destructuring is frequently used in React for component props.
/*
const ProductCard = ({ title, price, inStock = true }) => {
  return (
    <div className="product-card">
      <h2>{title}</h2>
      <p>Price: ${price}</p>
      <span>Status: {inStock ? "Available" : "Sold Out"}</span>
    </div>
  );
};
*/

const techStack = ["JavaScript", "React", "Next.js", "Tailwind CSS"];

// --- Pre-ES6 Approach ---
const firstTech = techStack[0];
const secondTech = techStack[1];

/*
  ARRAY DESTRUCTURING:
  Array destructuring uses iterators under the hood. It pulls values sequentially
  based on index. The first variable gets index 0, the second gets index 1, etc.
*/

// --- Modern Array Destructuring ---
// Variables are assigned based on their position in the array.
const [lang, lib] = techStack; // Extracts indices 0 and 1

console.log(lang); // Output: "JavaScript"
console.log(lib);  // Output: "React"

// --- Skipping Elements ---
// Elements can be skipped by using empty commas.
// Each comma without a variable name consumes an index from the iterator.
const [primaryLanguage, , , cssFramework] = techStack; // Skips index 1 and 2

console.log(primaryLanguage); // Output: "JavaScript"
console.log(cssFramework);    // Output: "Tailwind CSS"
