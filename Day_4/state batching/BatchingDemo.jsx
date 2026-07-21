// =========================================================================
// File: BatchingDemo.jsx (Demonstrating how React groups updates)
// =========================================================================
import React, { useState } from 'react';

const BatchingDemo = () => {
  const [count, setCount] = useState(0);
  const [activeFlag, setActiveFlag] = useState(false);
  const [statusText, setStatusText] = useState("Idle");

  // This log helps us count how many times React rendered the screen!
  console.log("🎨 COMPONENT RENDERED! Presenting UI to user...");

  const handleExecuteAllUpdates = () => {
    console.log("⚡ Button Clicked! Triggering 3 state updates now...");
    
    // Order 1 to the Waiter:
    setCount(prev => prev + 1);
    
    // Order 2 to the Waiter:
    setActiveFlag(true);
    
    // Order 3 to the Waiter:
    setStatusText("Processing Data");
    
    // Despite calling 3 setter functions, React does NOT render 3 times!
    // It groups them all into ONE single re-render after this function finishes!
  };

  return (
    <div className="p-6 border rounded bg-slate-900 text-white font-mono">
      <h3>Counter: {count}</h3>
      <p>Flag Status: {activeFlag ? "🟢 Active" : "🔴 Inactive"}</p>
      <p>System Status: [{statusText}]</p>
      
      <button 
        onClick={handleExecuteAllUpdates} 
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 font-bold"
      >
        Trigger 3 Updates at Once 🚀
      </button>
    </div>
  );
};

export default BatchingDemo;