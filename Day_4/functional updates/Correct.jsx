import React, { useState } from 'react';

const DelayedCounterCorrect = () => {
  const [count, setCount] = useState(0);

  const handleAsyncClick = () => {
    setTimeout(() => {
      // ✅ PERFECT: Even if count changed to 100 during the 3 seconds,
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