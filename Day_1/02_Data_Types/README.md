# Data Types

This section introduces JavaScript data types, distinguishing between primitive values and reference types like objects and arrays.

## Pros & Cons

### Primitives (String, Number, Boolean, etc.)
- **Pros**: Immutable and compared by value, making them predictable and lightweight.
- **Cons**: Limited in structure; cannot hold collections or complex nested data natively.

### Reference Types (Objects, Arrays)
- **Pros**: Capable of storing complex, nested, and structured data structures. Essential for state management in React.
- **Cons**: Compared by reference, which can cause unexpected mutation bugs. Requires careful handling (e.g., using spread syntax) to avoid unintended side effects.
