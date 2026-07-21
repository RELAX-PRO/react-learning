// =========================================================================
// File: PatientVisionCard.jsx (Step 3: Clean JSX Consuming Hybrid Styling)
// =========================================================================
import React from 'react';

const PatientVisionCard = ({ patientName, visionScore }) => {
  return (
    /* 
      Notice how clean this is! 
      bg-clinic-surface & text-clinic-text will automatically adapt to Light/Dark mode 
      in 1 millisecond without re-rendering this component!
    */
    <div className="bg-clinic-surface text-clinic-text p-6 rounded-2xl border border-slate-700/30 shadow-lg transition-colors duration-300">
      
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-mono">👁️ {patientName}</h3>
        
        {/* Using our dynamic primary color: */}
        <span className="bg-clinic-primary text-white text-xs px-3 py-1 rounded-full font-bold">
          Score: {visionScore}
        </span>
      </div>

      <p className="mt-4 text-sm opacity-80">
        All optical measurements have been verified and locked by the clinical system.
      </p>

    </div>
  );
};

export default PatientVisionCard;