# Variables

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
