// =========================================================================
// File: OpticalPrescriptionCard.jsx (Modern Utility-First Styling with Tailwind)
// =========================================================================
import React from 'react';

const OpticalPrescriptionCard = ({ patientName, date, sphereRight, sphereLeft, isUrgent }) => {
  return (
    /* 
      Notice the "Lego Blocks" in className:
      - bg-slate-900: Dark slate background
      - border & border-slate-800: Subtle border
      - rounded-2xl: Smooth 16px corner radius
      - p-6: 24px inner padding
      - transition-all & hover:-translate-y-1: Smooth lifting animation on hover!
    */
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 max-w-md font-mono">
      
      {/* Header Section (Auto Layout Row) */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">👁️ {patientName}</h3>
          <span className="text-xs text-slate-400">Exam Date: {date}</span>
        </div>

        {/* Dynamic Status Badge using simple conditional rendering */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          isUrgent 
            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        }`}>
          {isUrgent ? "Immediate Fitting" : "Standard Lens"}
        </span>
      </div>

      {/* Optical Measurements Grid (2 Columns) */}
      <div className="grid grid-cols-2 gap-4 my-6">
        
        {/* Right Eye (OD) Box */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">
            Right Eye (OD)
          </span>
          <p className="text-2xl font-extrabold text-blue-400">{sphereRight}</p>
        </div>

        {/* Left Eye (OS) Box */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">
            Left Eye (OS)
          </span>
          <p className="text-2xl font-extrabold text-cyan-400">{sphereLeft}</p>
        </div>

      </div>

      {/* Action Button */}
      <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer">
        Generate Optical Frame Order 👓
      </button>

    </div>
  );
};

export default OpticalPrescriptionCard;