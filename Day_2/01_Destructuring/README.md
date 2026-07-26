# Destructuring

Destructuring is an ES6 feature that makes it easy to extract values from arrays or properties from objects into distinct variables in a concise and readable way.

## Pros & Cons

**Pros:**
- Significantly reduces boilerplate code when accessing nested object properties.
- Improves code readability by explicitly stating which properties are being used.
- Allows assigning default values easily, helping avoid `undefined` errors.
- Frequently used in React for unpacking component props directly in the parameter list.

**Cons:**
- Deeply nested destructuring can sometimes be hard to read and format.
- Excessive renaming within destructuring can make tracking original object structures difficult.
