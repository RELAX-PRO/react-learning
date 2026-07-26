# Immutability Patterns

> **💡 How to Imagine This:**
> Imagine a photographer documenting a building's construction. Instead of painting over the same physical photograph every time a brick is laid (mutation), they take a completely new picture each time. React relies on comparing these distinct "snapshots" to know exactly what changed.

Explanation of avoiding direct mutations to state objects and arrays.

## Pros & Cons
**Pros:** Predictable state, prevents elusive bugs, ensures React detects changes and re-renders correctly.
**Cons:** Can be tedious for deeply nested objects without helper libraries.
