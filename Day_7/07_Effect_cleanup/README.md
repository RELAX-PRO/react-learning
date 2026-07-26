# 07. Effect Cleanup

This section highlights the critical importance of returning a cleanup function from the `useEffect` hook in React. It demonstrates how to properly tear down intervals and global event listeners when a component unmounts.

## Pros & Cons

**Pros:**
- Prevents memory leaks by ensuring resources (timers, event listeners, websockets, fetch requests) are properly destroyed when a component leaves the screen.
- Avoids bugs caused by updating state on an unmounted component.
- Ensures a clean slate when dependencies change and the effect needs to re-run.

**Cons:**
- Easy to forget, leading to silent performance degradation over time.
- Cleanup functions in Strict Mode during development run twice, which can be initially confusing for beginners (though it helps catch bugs).