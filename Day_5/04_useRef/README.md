# 04_useRef

> **💡 How to Imagine This:**
> Think of `useRef` as a secret pocket in your component. You can put things in it or take things out, and React won't even notice—it won't trigger a re-render. It's also the perfect tool for grabbing a direct handle to a physical DOM element on the screen.

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
