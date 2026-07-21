// ==========================================
// File 1: mathHelpers.js (Exporting File)
// ==========================================

// We can export multiple functions/variables simply by writing 'export' before them:
export const addNumbers = (a, b) => a + b;
export const multiplyNumbers = (a, b) => a * b;
export const PI_VALUE = 3.14159;


// ==========================================
// File 2: App.js (Importing File)
// ==========================================

// We MUST use braces {} and the EXACT names defined in the exported file:
import { addNumbers, PI_VALUE } from './mathHelpers.js';

console.log(addNumbers(10, 20)); // Output: 30
console.log(PI_VALUE);           // Output: 3.14159

// 💡 Bonus Trick: You can rename a named import using the 'as' keyword!
import { multiplyNumbers as multiply } from './mathHelpers.js';
console.log(multiply(5, 5)); // Output: 25



// ==========================================
// File 1: UserCard.js (Exporting File)
// ==========================================

const UserCard = ({ username, role }) => {
  return `<div>Welcome, ${username} (${role})</div>`;
};

// We export this single component as the DEFAULT export of this file:
export default UserCard;


// ==========================================
// File 2: MainScreen.js (Importing File)
// ==========================================

// Notice: NO curly braces {} !
// Notice: We can name it ANYTHING we want (e.g., ProfileCard, MyUserCard, Card)
import ProfileCard from './UserCard.js';

console.log(ProfileCard({ username: "Majed", role: "Admin" }));