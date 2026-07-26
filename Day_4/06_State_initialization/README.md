# State Initialization

Explanation of lazy initialization of state (e.g. passing a function to useState).

## Pros & Cons
**Pros:** Avoids re-running expensive initialization code on every render.
**Cons:** Slightly more complex syntax; only useful for heavy computations.
