// =========================================================================
// File: BatchingDemjsx (Demonstrating how React groups updates)
// =========================================================================
/**
 * MECHANICS: State Batching
 * To optimize performance, React 18+ automatically "batches" multiple state updates 
 * that occur within the same event handler or lifecycle lifecycle. Instead of re-rendering 
 * the component for every single `setState` call, React waits until all code in the event 
 * handler finishes executing, combines the state updates, and performs a single, unified re-render.
 * This prevents unnecessary intermediate renders and improves application speed.
 */
import React, { useState } from 'react';

const BatchingDemo = () => {
  const [count, setCount] = useState(0);
  const [activeFlag, setActiveFlag] = useState(false);
  const [statusText, setStatusText] = useState("Idle");

  // This log lets us see when React actually re-renders.
  console.log(" COMPONENT RENDERED! Presenting UI to user...");

  const handleExecuteAllUpdates = () => {
    console.log(" Button clicked! Triggering 3 state updates now...");

    // Use a functional update when the next value depends on the previous one.
    setCount(prev => prev + 1);

    // Independent updates can be written directly.
    setActiveFlag(true);

    // Another independent state update.
    setStatusText("Processing Data");

    // React batches these updates into a single render.
    // Inline Comment: Only ONE re-render happens after this function completes, NOT three.
  };

  return (
    <div className="p-6 border rounded bg-slate-900 text-white font-mono">
      <h3>Counter: {count}</h3>
      <p>Flag Status: {activeFlag ? " Active" : " Inactive"}</p>
      <p>System Status: [{statusText}]</p>

      <button
        onClick={handleExecuteAllUpdates}
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 font-bold"
      >
        Trigger 3 Updates at Once 
      </button>
    </div>
  );
};

export default BatchingDemo;