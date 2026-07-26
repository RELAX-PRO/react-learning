// ==========================================
// File: mathHelpers.js (Example Export)
// ==========================================

// Named exports allow exporting multiple functions or variables from a single file.
export const addNumbers = (a, b) => a + b;
export const multiplyNumbers = (a, b) => a * b;
export const PI_VALUE = 3.14159;

// ==========================================
// File: App.js (Example Import)
// ==========================================

// Importing named exports requires using curly braces and matching the exact names.
import { addNumbers, PI_VALUE } from './mathHelpers.js';

console.log(addNumbers(10, 20)); // Output: 30
console.log(PI_VALUE);           // Output: 3.14159

// Named imports can be aliased using the 'as' keyword.
import { multiplyNumbers as multiply } from './mathHelpers.js';
console.log(multiply(5, 5)); // Output: 25

// ==========================================
// File: UserCard.js (Example Default Export)
// ==========================================

const UserCard = ({ username, role }) => {
  return `<div>Welcome, ${username} (${role})</div>`;
};

// A file can have only one default export.
export default UserCard;

// ==========================================
// File: MainScreen.js (Example Default Import)
// ==========================================

// Default imports do not use curly braces and can be named arbitrarily.
import ProfileCard from './UserCard.js';

console.log(ProfileCard({ username: "Majed", role: "Admin" }));
