import React, { useState } from 'react';

/**
 * MECHANICS: Stale Closures in Asynchronous Operations
 * In JavaScript, functions form "closures", capturing variables from their surrounding scope
 * at the time of their creation. In this component, `setTimeout` captures the value of `count`
 * during the initial render. If `count` is updated by other actions before the timeout finishes,
 * the timeout's closure still holds the old `count` value (stale state).
 * When `setCount(count + 1)` runs, it overwrites the current state with the stale value + 1,
 * effectively erasing any intermediate state changes.
 */
const DelayedCounterWrong = () => {
  const [count, setCount] = useState(0);

  const handleAsyncClick = () => {
    setTimeout(() => {
      //  Important: 'count' here is trapped in a closure! 
      // It captures the value '0' from 3 seconds ago!
      // Inline Comment: This reads `count` from closure, which might be stale! Use `prev => prev + 1` instead.
      setCount(count + 1); // React executes: setCount(0 + 1)
    }, 3000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      {/* If I click this, then quickly click other normal sync buttons to make count 10... */}
      {/* After 3 seconds, the screen will forcibly JUMP BACK to 1! Destroying all progress! */}
      <button onClick={handleAsyncClick}>Delayed +1</button>
    </div>
  );
};