// A standard user profile object returned from a database or API
const developerProfile = {
  username: "Majed",
  role: "Frontend Engineer",
  experienceYears: 3,
  country: "Iraq"
};

// --- 1. THE OLD WAY (Pre-ES6) ---
// Repetitive, verbose, and boring to write:
const oldUser = developerProfile.username;
const oldRole = developerProfile.role;
const oldExp = developerProfile.experienceYears;

// --- 2. THE MODERN WAY (Object Destructuring) ---
// We extract 'username', 'role', and 'experienceYears' in ONE single line!
// Order does NOT matter here; JS matches by the key names:
const { role, experienceYears, username } = developerProfile;

console.log(username);        // Output: "Majed"
console.log(role);            // Output: "Frontend Engineer"
console.log(experienceYears); // Output: 3

// --- 3. ADVANCED TRICKS WITH OBJECT DESTRUCTURING ---

// A) Renaming variables during destructuring (key: newName)
// What if you want to extract 'experienceYears' but store it in a variable named 'exp'?
const { experienceYears: exp, country: userLocation } = developerProfile;
console.log(exp);          // Output: 3
console.log(userLocation); // Output: "Iraq"

// B) Assigning Default Values (Fallback if the property doesn't exist)
// If 'accountStatus' is not in the object, it will default to "Active" instead of undefined:
const { username: name, accountStatus = "Active" } = developerProfile;
console.log(accountStatus); // Output: "Active"

// The Real-World React Style:
// Destructuring the props object directly inside the component parameters!
  // const ProductCard = ({ title, price, inStock = true }) => {
  //   return (
  //     <div className="product-card">
  //       <h2>{title}</h2>
  //       <p>Price: ${price}</p>
  //       <span>Status: {inStock ? "Available" : "Sold Out"}</span>
  //     </div>
  //   );
  // };

const techStack = ["JavaScript", "React", "Next.js", "Tailwind CSS"];

// --- 1. THE OLD WAY ---
const firstTech = techStack[0];
const secondTech = techStack[1];

// --- 2. THE MODERN WAY (Array Destructuring) ---
// Names are arbitrary, but ORDER is everything!
// 'lang' gets index 0 ("JavaScript"), 'lib' gets index 1 ("React")
const [lang, lib] = techStack;

console.log(lang); // Output: "JavaScript"
console.log(lib);  // Output: "React"

// --- 3. SKIPPING ELEMENTS ---
// What if we want only the 1st item ("JavaScript") and the 4th item ("Tailwind CSS")?
// We simply leave empty commas (,,) to skip the items in between!
const [primaryLanguage, , , cssFramework] = techStack;

console.log(primaryLanguage); // Output: "JavaScript"
console.log(cssFramework);    // Output: "Tailwind CSS"

