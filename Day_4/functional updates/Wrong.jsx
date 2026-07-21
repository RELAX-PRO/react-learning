import React, { useState } from 'react';

const DelayedCounterWrong = () => {
  const [count, setCount] = useState(0);

  const handleAsyncClick = () => {
    setTimeout(() => {
      // ⚠️ CRITICAL BUG: 'count' here is trapped in a closure! 
      // It captures the value '0' from 3 seconds ago!
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