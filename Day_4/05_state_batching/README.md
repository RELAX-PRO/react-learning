# State Batching

Explanation of React grouping multiple state updates into a single re-render for performance.

## Pros & Cons
**Pros:** Optimizes performance by reducing unnecessary renders.
**Cons:** May require functional updates if multiple queued updates depend on each other.
