# State Batching

> **💡 How to Imagine This:**
> Think of state batching like a waiter taking orders. Instead of running to the kitchen every time you ask for a burger, then running back when you ask for fries, and again for a drink, the waiter writes down all your requests at once. They then make a single trip to the kitchen (one re-render) with your entire updated order.

Explanation of React grouping multiple state updates into a single re-render for performance.

## Pros & Cons
**Pros:** Optimizes performance by reducing unnecessary renders.
**Cons:** May require functional updates if multiple queued updates depend on each other.
