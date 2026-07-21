// CRITICAL BUG: Direct mutation does NOT trigger a Re-render!
const Counter = () => {
  let [count, setCount] = useState(0);

  const handleWrongClick = () => {
    // ⚠️ You are mutating the variable directly in memory:
    count = count + 1; 
    console.log("Count in RAM is now:", count); // It changes in console, BUT...
    // ❌ THE SCREEN WILL NEVER UPDATE! React has no idea you touched it!
  };

  return <button onClick={handleWrongClick}>Count: {count}</button>;
};


// PRO WAY: Always use the Remote Control (setCount) to update!
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleCorrectClick = () => {
    // ✅ React wakes up, updates VDOM, and re-renders the screen instantly!
    setCount(count + 1); 
  };

  return <button onClick={handleCorrectClick}>Count: {count}</button>;
};





// test 
const handleMysteryClick = () => {
  setCount(count + 5);
  setCount(prevCount => prevCount + 2);
  setCount(count + 10);
  setCount(prevCount => prevCount + 3);
};
// what is the result of the above code?