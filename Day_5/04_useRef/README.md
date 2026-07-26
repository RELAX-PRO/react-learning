# 04_useRef

## Overview
Stable mutable values and direct DOM access hook.

## Pros & Cons

### Pros
- Persists data between renders without triggering re-renders.
- Allows direct DOM manipulation when necessary.
- Useful for storing timer IDs and previous state.

### Cons
- Overuse can lead to imperatively driven UI, breaking React's declarative model.
- Does not trigger UI updates on mutation.
