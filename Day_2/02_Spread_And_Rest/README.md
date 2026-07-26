# Spread & Rest Operators

The spread operator (`...`) allows an iterable (like an array or object) to be expanded in places where zero or more arguments or elements are expected. The rest parameter syntax allows a function to accept an indefinite number of arguments as an array.

## Pros & Cons

**Pros:**
- Enables creating shallow copies of objects and arrays quickly, which is crucial for immutable state updates in React.
- Simplifies merging arrays and objects without using verbose methods like `Object.assign()` or `Array.prototype.concat()`.
- Makes functional programming patterns easier to implement.

**Cons:**
- Only creates shallow copies. Nested objects/arrays are still passed by reference and can be accidentally mutated.
- Overusing the spread operator in large objects or arrays can have slight performance implications due to constant recreation of data structures.
