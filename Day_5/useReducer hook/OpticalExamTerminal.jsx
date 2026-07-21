// =========================================================================
// File: OpticalExamTerminal.jsx (Mastering useReducer for Complex UI)
// =========================================================================
import React, { useReducer } from 'react';

// 1. INITIAL STATE: Putting all related sub-states into one solid object:
const initialExamState = {
  isExamining: false,
  patientId: null,
  duration: 0,
  errorMessage: null
};

// 2. THE REDUCER: The central brain enforcing all business rules safely:
const examSessionReducer = (state, action) => {
  switch (action.type) {
    case 'START_SESSION':
      // Enforce Rule: Starting a session MUST wipe old errors and reset duration!
      return {
        isExamining: true,
        patientId: action.payload,
        duration: 0,
        errorMessage: null
      };

    case 'TICK_TIMER':
      // Can only increment timer if a session is actively running
      if (!state.isExamining) return state;
      return { ...state, duration: state.duration + 1 };

    case 'REPORT_ERROR':
      return {
        ...state,
        isExamining: false,
        errorMessage: action.payload
      };

    case 'END_SESSION':
      return {
        ...initialExamState // Reset everything back to default clean state
      };

    default:
      return state;
  }
};

// 3. THE COMPONENT: Clean, declarative, and zero manual state juggling!
const OpticalExamTerminal = () => {
  const [examState, dispatch] = useReducer(examSessionReducer, initialExamState);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg font-mono border border-slate-700 max-w-md">
      <h2 className="text-xl font-bold text-blue-400 mb-4">👁️ Diagnostic Control Panel</h2>

      {/* Status Banner */}
      <div className="p-3 rounded bg-slate-800 mb-4 border border-slate-700">
        <p>Status: {examState.isExamining ? "🟢 IN PROGRESS" : "🔴 STANDBY"}</p>
        <p>Patient ID: {examState.patientId || "None Selected"}</p>
        <p>Elapsed Time: {examState.duration} seconds</p>
      </div>

      {/* Error Display */}
      {examState.errorMessage && (
        <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded mb-4 text-xs">
          ⚠️ ERROR: {examState.errorMessage}
        </div>
      )}

      {/* Dispatching Actions via buttons: */}
      <div className="flex flex-col gap-2">
        {!examState.isExamining ? (
          <button
            onClick={() => dispatch({ type: 'START_SESSION', payload: 'OPT-2026-99' })}
            className="bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold transition"
          >
            Start Exam for Patient OPT-2026-99 ▶️
          </button>
        ) : (
          <>
            <button
              onClick={() => dispatch({ type: 'TICK_TIMER' })}
              className="bg-yellow-600 hover:bg-yellow-500 py-2 rounded font-bold transition"
            >
              Simulate +1 Second ⏱️
            </button>

            <button
              onClick={() => dispatch({ type: 'REPORT_ERROR', payload: 'Lens calibration failed!' })}
              className="bg-red-600 hover:bg-red-500 py-2 rounded font-bold transition"
            >
              Simulate Hardware Error ⚠️
            </button>

            <button
              onClick={() => dispatch({ type: 'END_SESSION' })}
              className="bg-slate-700 hover:bg-slate-600 py-2 rounded font-bold transition"
            >
              End & Save Session ⏹️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OpticalExamTerminal;