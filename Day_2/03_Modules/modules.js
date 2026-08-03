/*
  =========================================
  MODULE MECHANICS IN ES6
  =========================================
  ES6 Modules allow you to separate code into independent files. 
  Under the hood, modules are statically analyzed, meaning their structure 
  is determined at compile time rather than run time. This enables optimizations 
  like "tree-shaking" (removing unused code).
  
  Modules are strictly isolated. Variables defined in a module are scoped 
  to that module, not the global window or global scope, unless explicitly exported.
*/

// ==========================================
// File: mathHelpers.js (Example Export)
// ==========================================

// Named exports allow exporting multiple functions or variables from a single file.
// The `export` keyword exposes these bindings to other modules.
export const addNumbers = (a, b) => a + b; // Arrow function export
export const multiplyNumbers = (a, b) => a * b;
export const PI_VALUE = 3.14159;

// ==========================================
// File: App.js (Example Import)
// ==========================================

// Importing named exports requires using curly braces and matching the exact names.
// The `{ ... }` syntax here is not object destructuring, but ES6 import specifiers.
import { addNumbers, PI_VALUE } from './mathHelpers.js';

console.log(addNumbers(10, 20)); // Output: 30
console.log(PI_VALUE);           // Output: 3.14159

// Named imports can be aliased using the 'as' keyword.
// This renaming happens at the binding level during import resolution.
import { multiplyNumbers as multiply } from './mathHelpers.js'; // Renaming `multiplyNumbers` to `multiply`
console.log(multiply(5, 5)); // Output: 25

// ==========================================
// File: UserCard.js (Example Default Export)
// ==========================================

/*
  DEFAULT EXPORTS:
  Each module can have a single `default` export. 
  A default export is essentially a named export with the special name `default`.
*/
const UserCard = ({ username, role }) => {
  return `<div>Welcome, ${username} (${role})</div>`;
};

// A file can have only one default export.
export default UserCard; // Exporting the variable `UserCard` as the default binding

// ==========================================
// File: MainScreen.js (Example Default Import)
// ==========================================

// Default imports do not use curly braces and can be named arbitrarily.
// Under the hood, this imports the `default` export and binds it to `ProfileCard`.
import ProfileCard from './UserCard.js'; // `ProfileCard` maps to the `default` export of the module

console.log(ProfileCard({ username: "Majed", role: "Admin" }));
