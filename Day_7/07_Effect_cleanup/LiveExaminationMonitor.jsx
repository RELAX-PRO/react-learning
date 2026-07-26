// =========================================================================
// File: LiveExaminationMonitor.jsx
// Description: Demonstrates properly cleaning up effects in React components.
// =========================================================================
import React, { useState, useEffect } from 'react';

const LiveExaminationMonitor = ({ patientName, onCloseRoom }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    // 1. Setup Phase: Start a background timer
    const timerId = setInterval(() => {
      setSecondsElapsed((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // 2. Setup Phase: Attach an event listener
    const handleEmergencyExit = (event) => {
      if (event.key === 'Escape') {
        onCloseRoom();
      }
    };
    window.addEventListener('keydown', handleEmergencyExit);

    // 3. Cleanup Function
    // React guarantees this function runs when the component unmounts,
    // or right before the effect re-runs if dependencies change.
    return () => {
      // Clear the interval to prevent memory leaks and background execution
      clearInterval(timerId);
      
      // Remove the global event listener to prevent unintended behavior in other components
      window.removeEventListener('keydown', handleEmergencyExit);
    };
  }, [onCloseRoom]);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-500/50 font-mono text-white max-w-lg mx-auto shadow-2xl animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
        <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <span>LIVE REFRACTION ROOM</span>
        </h2>
        <span className="text-xs bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
          Active Session
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400">Current Patient on Chair:</p>
          <p className="text-xl font-bold text-slate-100 mt-1">{patientName}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Examination Duration:</span>
          <span className="text-2xl font-extrabold text-blue-400">
            {secondsElapsed} <span className="text-xs text-slate-500 font-normal">sec</span>
          </span>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">ESC</kbd> on keyboard at any time to close.
        </p>
      </div>

      <button
        onClick={onCloseRoom}
        className="mt-6 w-full py-3 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-red-600/20 cursor-pointer"
      >
        End Examination & Leave Room
      </button>
    </div>
  );
};

export default LiveExaminationMonitor;