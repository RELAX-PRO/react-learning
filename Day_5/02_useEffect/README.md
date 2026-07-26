# 02_useEffect

## Overview
Side effects, data fetching, timers, and subscriptions hook.

## Pros & Cons

### Pros
- Handles side effects explicitly.
- Manages component lifecycle cleanly with cleanup functions.
- Keeps main render function pure.

### Cons
- Easy to cause infinite loops if dependencies are mismanaged.
- Can lead to spaghetti code if overused for derived state.
