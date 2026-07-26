# Functional Updates

Explanation of using functional state updates (setCount(prev => prev + 1)).

## Pros & Cons
**Pros:** Ensures state updates rely on the most current state value, avoiding closure bugs.
**Cons:** Slightly more verbose than passing a direct value.
