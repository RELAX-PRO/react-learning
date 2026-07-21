// =========================================================================
// File: components/LiveExaminationMonitor.jsx (Mastering Effect Cleanup)
// =========================================================================
import React, { useState, useEffect } from 'react';

const LiveExaminationMonitor = ({ patientName, onCloseRoom }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    console.log("🟢 [Mount]: Doctor entered exam room. Laser & UI activated!");

    // 1. STARTING A BACKGROUND TIMER: Update duration every 1 second
    const timerId = setInterval(() => {
      setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      console.log("⏱️ Background tick: Monitoring eye refraction calibration...");
    }, 1000);

    // 2. STARTING AN EVENT LISTENER: Listen for 'Escape' key to emergency close
    const handleEmergencyExit = (event) => {
      if (event.key === 'Escape') {
        console.log("🚨 Emergency 'ESC' detected! Shutting down exam room...");
        onCloseRoom();
      }
    };
    window.addEventListener('keydown', handleEmergencyExit);

    // 3. THE GOLDEN CLEANUP FUNCTION (The "Switch Off" safety breaker!):
    // React GUARANTEES this return function executes the exact millisecond 
    // the component unmounts (or right before re-running the effect)!
    return () => {
      console.log("🔴 [Unmount/Cleanup]: Doctor left! Turning off devices...");
      
      // Stop the interval from running forever in phone/browser RAM:
      clearInterval(timerId);
      
      // Remove keyboard listener so it doesn't affect other clinic pages:
      window.removeEventListener('keydown', handleEmergencyExit);
      
      console.log("✨ Room cleaned. RAM restored to 100% capacity!");
    };
  }, [onCloseRoom]); // Re-run ONLY if onCloseRoom reference changes

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-500/50 font-mono text-white max-w-lg mx-auto shadow-2xl animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
        <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <span>🟢 LIVE REFRACTION ROOM</span>
        </h2>
        <span className="text-xs bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
          Active Session
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400">Current Patient on Chair:</p>
          <p className="text-xl font-bold text-slate-100 mt-1">👁️ {patientName}</p>
        </div>

        {/* Live Timer Output */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Examination Duration:</span>
          <span className="text-2xl font-extrabold text-blue-400">
            {secondsElapsed} <span className="text-xs text-slate-500 font-normal">sec</span>
          </span>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          💡 Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">ESC</kbd> on keyboard at any time to instantly close & clean up.
        </p>
      </div>

      <button
        onClick={onCloseRoom}
        className="mt-6 w-full py-3 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-red-600/20 cursor-pointer"
      >
        End Examination & Leave Room 🚪
      </button>
    </div>
  );
};

export default LiveExaminationMonitor;