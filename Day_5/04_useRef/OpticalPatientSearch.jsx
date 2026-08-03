/**
 * ============================================================================
 * BLOCK COMMENT: Mastering useRef
 * ============================================================================
 * The `useRef` hook returns a mutable ref object whose `.current` property is
 * initialized to the passed argument. 
 * 
 * It has two main use cases:
 * 1. DOM ACCESS: Accessing a DOM element directly (e.g., to focus an input).
 * 2. SILENT STORAGE: Storing a mutable value that does NOT cause a re-render
 *    when updated. This is perfect for keeping track of interval IDs, previous
 *    state values, or any other data that isn't directly rendered on screen.
 * ============================================================================
 */

// =========================================================================
// File: OpticalPatientSearch.jsx (Mastering DOM Access & Silent Storage)
// =========================================================================
import React, { useState, useRef, useEffect } from 'react';

const OpticalPatientSearch = () => {
  // 1. VISIBLE STATE: Causes re-renders when updated (seen by user)
  const [examDuration, setExamDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 2. SILENT REFS: Persist across renders without triggering re-renders
  // Initializes `.current` to null. We'll attach it to a DOM element later.
  const searchInputRef = useRef(null); // Will hold the real <input> DOM element
  const timerIdRef = useRef(null);     // Will hold the setInterval ID silently

  //  EFFECT: Auto-focus the search box immediately when the screen loads!
  useEffect(() => {
    // We access the raw HTML input node via .current and call browser's .focus()
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      console.log(" Search input auto-focused via useRef!");
    }

    // Cleanup: Stop the timer if the component unmounts
    // timerIdRef.current holds the interval ID safely across renders
    return () => clearInterval(timerIdRef.current);
  }, []); // Empty dependency array means this only runs once on mount

  //  Timer Handlers using Silent Ref Storage:
  const startExamTimer = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    // We store the interval ID inside the Ref! No re-render triggered for saving ID!
    // Since it doesn't trigger a re-render, we don't accidentally restart intervals or lose focus.
    timerIdRef.current = setInterval(() => {
      setExamDuration(prev => prev + 1); // This state update updates the screen
    }, 1000);
  };

  const stopExamTimer = () => {
    clearInterval(timerIdRef.current); // Accessing silent ID instantly
    timerIdRef.current = null;
    setIsRunning(false);
  };

  const resetExam = () => {
    stopExamTimer();
    setExamDuration(0);
    // Return focus back to the search box when resetting!
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg max-w-md mx-auto font-mono">
      <h2 className="text-xl font-bold text-blue-400 mb-4"> Optical Patient Terminal</h2>

      {/* DOM ACCESS capability: Binding the ref to the input tag */}
      <div className="mb-6">
        <label className="block text-xs text-slate-400 mb-1">Quick Patient Search:</label>
        <input
          // Passing our ref object to the `ref` prop links the DOM node to searchInputRef.current
          ref={searchInputRef} // <-- Hooking into the real HTML node!
          type="text"
          placeholder="Type patient file number..."
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-blue-500"
        />
      </div>

      <hr className="border-slate-700 my-4" />

      {/* TIMER capability: Managed smoothly by useRef in the background */}
      <div className="text-center my-4">
        <p className="text-sm text-slate-400">Eye Exam Duration:</p>
        <p className="text-4xl font-bold text-yellow-400 my-2">{examDuration} sec</p>
      </div>

      <div className="flex gap-2 justify-center">
        {!isRunning ? (
          <button 
            onClick={startExamTimer}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-bold transition"
          >
            Start Exam 
          </button>
        ) : (
          <button 
            onClick={stopExamTimer}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-bold transition"
          >
            Pause 
          </button>
        )}
        <button 
          onClick={resetExam}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded font-bold transition"
        >
          Reset 
        </button>
      </div>
    </div>
  );
};

export default OpticalPatientSearch;