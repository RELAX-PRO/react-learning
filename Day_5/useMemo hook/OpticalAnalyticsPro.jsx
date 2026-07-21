// =========================================================================
// File: OpticalAnalyticsPro.jsx (High Performance with useMemo)
// =========================================================================
import React, { useState, useMemo } from 'react';

const OpticalAnalyticsPro = ({ patientsList }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  // 🛡️ THE CACHED COMPUTATION:
  // React will run this massive calculation ONLY if 'patientsList' or 'filterQuery' changes!
  // If the user just clicks 'Toggle Theme', React SKIPS this block instantly! ⚡
  const processedOpticalStats = useMemo(() => {
    console.log("🐌 CPU Intensive Task: Processing 10,000 optical records...");
    
    // Simulating heavy filtering and math:
    const filtered = patientsList.filter(p => p.diagnosis.includes(filterQuery));
    const totalMyopia = filtered.filter(p => p.type === "Myopia").length;
    
    return {
      totalPatients: filtered.length,
      myopiaCount: totalMyopia,
      percentage: filtered.length ? ((totalMyopia / filtered.length) * 100).toFixed(1) : 0
    };
  }, [patientsList, filterQuery]); // <-- Only recalculate if these two variables mutate!

  return (
    <div className={`p-6 rounded-xl font-mono transition ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black border"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-500">👁️ Optical Analytics Engine</h2>
        
        {/* Clicking this button triggers a re-render, but zero CPU calculation lag! */}
        <button 
          onClick={() => setIsDarkMode(prev => !prev)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold"
        >
          Toggle Theme 🌓 ({isDarkMode ? "Dark" : "Light"})
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by diagnosis (e.g., Myopia)..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
        />
      </div>

      {/* Rendering the cached results instantly: */}
      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-xs text-slate-400">Total Filtered</p>
          <p className="text-2xl font-bold text-green-400">{processedOpticalStats.totalPatients}</p>
        </div>
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-xs text-slate-400">Myopia Cases</p>
          <p className="text-2xl font-bold text-yellow-400">{processedOpticalStats.myopiaCount}</p>
        </div>
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-xs text-slate-400">Myopia Rate</p>
          <p className="text-2xl font-bold text-blue-400">{processedOpticalStats.percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default OpticalAnalyticsPro;