import React, { useState } from 'react';

/**
 * MECHANICS: Functional Updates for Asynchronous State
 * When state updates are asynchronous (e.g., inside setTimeout, setInterval, or API calls),
 * relying on the state variable directly from the closure can lead to "stale state" issues.
 * This happens because the function captures the state value at the time the closure was created.
 * By passing a callback function to the state setter (e.g., `setCount(prev => prev + 1)`), 
 * React guarantees that `prev` will be the most up-to-date state from its internal ledger,
 * bypassing the stale value in the closure.
 */
const DelayedCounterCorrect = () => {
  const [count, setCount] = useState(0);

  const handleAsyncClick = () => {
    setTimeout(() => {
      //  Correct Implementation: Even if count changed to 100 during the 3 seconds,
      // 'prev' will grab the absolute latest value (100) from React's live ledger!
      setCount(prev => prev + 1); // 100 + 1 = 101!
    }, 3000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleAsyncClick}>Delayed +1 (Secured)</button>
    </div>
  );
};