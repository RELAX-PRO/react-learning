# 02_useEffect

> **💡 How to Imagine This:**
> Think of `useEffect` as an assistant who runs errands for your component *after* it's done rendering on the screen. Whether it's fetching data from a server or setting up a subscription, the assistant handles it in the background so it doesn't block the UI from showing up.

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
