# State Initialization

> **💡 How to Imagine This:**
> Imagine moving into a new house. You only need to build the foundation and set up the heavy furniture once on moving day. Lazy state initialization is like telling React to only do the "heavy lifting" (expensive computations) the very first time the component renders, and never again.

Explanation of lazy initialization of state (e.g. passing a function to useState).

## Pros & Cons
**Pros:** Avoids re-running expensive initialization code on every render.
**Cons:** Slightly more complex syntax; only useful for heavy computations.
