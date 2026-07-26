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
  setCount(count + 5);
  setCount(prevCount => prevCount + 2);
  setCount(count + 10);
  setCount(prevCount => prevCount + 3);
};

// If the previous count was 0, the rendered result becomes 13.