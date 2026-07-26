# Control Structures

This section reviews logic flow control, including conditionals and iterative structures, contrasting imperative approaches with declarative ones.

## Pros & Cons

### Ternary Operator & Object Mapping
- **Pros**: Declarative and concise. Ternaries can be embedded directly within JSX return statements. Object mapping replaces verbose `switch` cases.
- **Cons**: Can become difficult to read if nested or overused for complex logic.

### Declarative Loops (`Array.map`)
- **Pros**: Returns a new array, maintaining immutability. Easily embedded in JSX for rendering lists of components.
- **Cons**: Slightly less performant in raw operations compared to traditional `for` loops, though negligible in most UI contexts.

### Imperative Logic (`if/else`, `for`)
- **Pros**: Fine-grained control over execution steps and state mutation.
- **Cons**: Cannot be used inline inside JSX expressions. Tends to be more verbose.
