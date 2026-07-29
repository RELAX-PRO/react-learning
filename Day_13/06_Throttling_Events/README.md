# Lesson 6: Throttling Events

## Debouncing vs Throttling
While they both restrict how often a function runs, they have different goals:
- **Debouncing**: "Wait until the user completely *stops* doing the action for X milliseconds, then run it once." (Great for typing).
- **Throttling**: "The user is doing an action continuously. Force the function to run at a strict, steady rhythm (e.g., exactly once every 300ms) while the action is happening." (Great for scrolling or resizing).

## The Scroll Problem
If you listen to the window's `scroll` event, the browser will fire that event hundreds of times per second as the user moves their mouse wheel. 
If your event handler does heavy DOM calculations (like calculating scroll progress), the browser will freeze and stutter.

## The Throttling Solution
In `PatientMedicalRecord.tsx`, we use `lodash/throttle` to create a "regulator valve":

```typescript
const handleScroll = throttle(() => {
  // Heavy DOM calculations...
}, 300);
```

No matter how furiously the doctor scrolls through the medical record, our calculation will only execute a maximum of roughly 3 times per second. The browser breathes easily, and the UI remains buttery smooth.
