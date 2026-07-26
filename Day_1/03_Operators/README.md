# Operators

This section explores arithmetic, assignment, logical, and comparison operators in JavaScript, emphasizing their behavior in modern contexts like React.

## Pros & Cons

### Strict Equality (`===`) vs Loose Equality (`==`)
- **Pros of `===`**: Predictable comparison without implicit type coercion. Safe and recommended.
- **Cons of `==`**: Implicit type coercion often leads to unexpected truthy/falsy evaluations and hard-to-track bugs.

### Logical Operators (`&&`, `||`)
- **Pros**: Enable concise conditional evaluations and fallback values. In React, `&&` is crucial for short-circuit conditional rendering.
- **Cons**: Can sometimes yield unexpected non-boolean values if not explicitly converted, leading to unintended renders (e.g., rendering `0` on screen).
