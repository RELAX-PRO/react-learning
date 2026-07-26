const oldCart = ["Apple", "Banana"];

// Mutation is generally avoided in React, as it can prevent state updates from triggering re-renders.
// oldCart.push("Orange"); 

// --- Spread Operator with Arrays ---
// Creates a shallow copy of the existing array and appends new items.
const newCart = [...oldCart, "Orange"];

console.log(oldCart); // Output: ["Apple", "Banana"] (Original array is unchanged)
console.log(newCart); // Output: ["Apple", "Banana", "Orange"] (New array instance)

// Merging arrays using the spread operator
const fruits = ["Apple", "Mango"];
const vegetables = ["Tomato", "Potato"];
const groceries = [...fruits, ...vegetables];
console.log(groceries); // Output: ["Apple", "Mango", "Tomato", "Potato"]


const userProfile = {
  username: "Majed",
  age: 24,
  role: "Developer",
  city: "Mosul"
};

// Direct object mutation is also discouraged in modern React development.
// userProfile.age = 25;

// --- Spread Operator with Objects ---
// Copies properties from an existing object and allows overriding or adding new ones.
const updatedProfile = {
  ...userProfile,
  age: 25, // Overrides the existing 'age' property
  isOnline: true // Adds a new property
};

console.log(updatedProfile);
/* Output:
{
  username: "Majed",
  age: 25,
  role: "Developer",
  city: "Mosul",
  isOnline: true
}
*/
