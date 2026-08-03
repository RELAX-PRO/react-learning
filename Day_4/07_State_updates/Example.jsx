/**
 * MECHANICS: State Mutation vs Replacement & Update Queueing
 * 1. Mutation: Altering a state variable directly (e.g., `count = count + 1`) does not notify React 
 *    that the state has changed. The component will not re-render. You must always use the setter function.
 * 2. Asynchronous Queueing: React state setters don't change the value immediately in the current scope.
 *    They enqueue an update for the *next* render. This means subsequent `setCount(count + ...)` calls 
 *    in the same block will all see the original `count` value.
 * 3. Functional Updates in Queues: Using `setCount(prev => prev + 1)` ensures the update builds upon 
 *    the previously queued update rather than the initial state of the current render cycle.
 */

// Wrong: direct mutation updates memory, not React state.
const BrokenCounter = () => {
  const [count, setCount] = useState(0);

  const handleWrongClick = () => {
    const nextCount = count + 1;
    console.log('Count changed in the variable:', nextCount);
    // React still does not know the value changed because setCount was not called.
  };

  return <button onClick={handleWrongClick}>Count: {count}</button>;
};

// Correct: always use the state setter.
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleCorrectClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleCorrectClick}>Count: {count}</button>;
};

// Mixed updates example: the final value is previous count + 13.
const handleMysteryClick = () => {
  // Inline Comment: This queues an update to set the next render's state to (0 + 5) = 5
  setCount(count + 5);
  setCount(prevCount => prevCount + 2);
  setCount(count + 10);
  setCount(prevCount => prevCount + 3);
};

// If the previous count was 0, the rendered result becomes 13.