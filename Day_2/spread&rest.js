const oldCart = ["Apple", "Banana"];

// ❌ THE BAD WAY (Mutation - React will NOT re-render the screen!):
// oldCart.push("Orange"); 

// ✅ THE MODERN REACT WAY (Spread Operator):
// We create a new array, dump all items from 'oldCart' into it using (...), then add "Orange"
const newCart = [...oldCart, "Orange"];

console.log(oldCart); // Output: ["Apple", "Banana"] (Safe and untouched!)
console.log(newCart); // Output: ["Apple", "Banana", "Orange"] (Brand new copy!)

// 💡 Bonus: You can merge two arrays instantly!
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

// ❌ THE BAD WAY (Direct Mutation):
// userProfile.age = 25;

// ✅ THE MODERN REACT WAY (Spread Operator for Objects):
// 1. Copy everything from 'userProfile' using (...userProfile)
// 2. Overwrite only the 'age' property with the new value!
const updatedProfile = {
  ...userProfile,
  age: 25,
  isOnline: true // We can even add brand new properties at the same time!
};

console.log(updatedProfile);
/* Output:
{
  username: "Majed",
  age: 25,         <-- Updated!
  role: "Developer", <-- Preserved safely!
  city: "Mosul",     <-- Preserved safely!
  isOnline: true   <-- Added!
}
*/