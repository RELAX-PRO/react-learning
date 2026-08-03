/*
  =========================================
  SPREAD SYNTAX MECHANICS
  =========================================
  The spread syntax (`...`) allows an iterable (like an array or string) to be 
  expanded in places where zero or more arguments or elements are expected. 
  For object literals, the spread syntax enumerates the own properties of an 
  object and adds the key-value pairs to the object being created.
  
  Crucially, spread creates *shallow copies*. If the original array or object 
  contains nested objects, the nested references are copied, not duplicated.
*/

const oldCart = ["Apple", "Banana"];

// Mutation is generally avoided in React, as it can prevent state updates from triggering re-renders.
// oldCart.push("Orange"); 

// --- Spread Operator with Arrays ---
// Creates a shallow copy of the existing array and appends new items.
// The `...oldCart` unpacks the elements "Apple" and "Banana" into the new array.
const newCart = [...oldCart, "Orange"];

console.log(oldCart); // Output: ["Apple", "Banana"] (Original array is unchanged)
console.log(newCart); // Output: ["Apple", "Banana", "Orange"] (New array instance)

// Merging arrays using the spread operator
const fruits = ["Apple", "Mango"];
const vegetables = ["Tomato", "Potato"];
const groceries = [...fruits, ...vegetables]; // Unpacks elements from both arrays sequentially
console.log(groceries); // Output: ["Apple", "Mango", "Tomato", "Potato"]


const userProfile = {
  username: "Majed",
  age: 24,
  role: "Developer",
  city: "Mosul"
};

// Direct object mutation is also discouraged in modern React development.
// userProfile.age = 25;

/*
  OBJECT SPREAD MECHANICS:
  When spreading objects, the properties are applied in the order they appear.
  If the same property key appears multiple times, the last one provided will 
  override the previous values. This allows us to "update" properties without 
  mutating the original object.
*/

// --- Spread Operator with Objects ---
// Copies properties from an existing object and allows overriding or adding new ones.
const updatedProfile = {
  ...userProfile, // Spreads own enumerable properties of `userProfile`
  age: 25, // Overrides the existing 'age' property because it comes after the spread
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
