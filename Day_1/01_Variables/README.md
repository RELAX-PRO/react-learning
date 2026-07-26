# Variables

> **💡 How to Imagine This:**
> Think of variables like labeled storage boxes. `const` is a box locked in place—you can't swap the box itself, but if it holds a backpack (like an object or array), you can still take things in and out of the backpack. `let` is a box where you can safely swap out its contents whenever needed. `var` is like a leaky box that sometimes mysteriously ends up in the wrong room.

This section covers variable declarations in modern JavaScript, focusing on `const` and `let` versus the legacy `var`.

## Pros & Cons

### `const`
- **Pros**: Creates an immutable binding, preventing accidental reassignments. Signals intent clearly.
- **Cons**: Cannot be reassigned. Note that for objects and arrays, inner properties or elements can still be mutated.

### `let`
- **Pros**: Block-scoped, preventing variable leakage. Allows reassignment when a value legitimately needs to change.
- **Cons**: Can lead to unpredictable state if mutated excessively throughout a block.

### `var`
- **Pros**: Function-scoped, which had use cases in legacy environments.
- **Cons**: Susceptible to hoisting bugs, scope leaks, and accidental redeclarations. Best avoided in modern development.
