# Functions

> **💡 How to Imagine This:**
> Think of a function like a recipe in a cookbook. You write down the steps once, and then you can cook the meal (invoke the function) as many times as you want by just calling its name. An Arrow Function is like a quick, modern recipe card—short, sweet, and to the point. A Function Declaration is like a traditional cookbook entry that the chef remembers perfectly even before opening the book.

This section covers different ways to define and use functions in JavaScript, including declarations, expressions, and arrow functions.

## Pros & Cons

### Arrow Functions
- **Pros**: Concise syntax, implicit returns, and lexical scoping of `this`. The standard for defining functional React components and inline callbacks.
- **Cons**: Cannot be used as constructors. Not hoisted, so they must be declared before use.

### Function Declarations
- **Pros**: Hoisted, meaning they can be invoked before their definition in the file. Useful for utility functions at the bottom of a file.
- **Cons**: Verbose syntax compared to arrow functions, and context (`this`) behaves dynamically, which can cause issues in class-based components.
