// =========================================================================
// File: views/DynamicVisitViewer.jsx (Mastering Route Parameters)
// =========================================================================
import React, { useState, useEffect } from 'react';
// 1. Import the dynamic parameter reading hook:
import { useParams, useNavigate } from 'react-router-dom';
import optometryApiClient from '../services/optometryApiClient';

const DynamicVisitViewer = () => {
  // 2. EXTRACTING DYNAMIC ROUTE PARAMETERS:
  // Names MUST match exactly what you wrote after ":" in the Route path!
  const { patientId, visitId } = useParams();
  const navigate = useNavigate();

  const [visitData, setVisitData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDynamicVisitRecord = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`🌐 Fetching refraction audit for Patient #${patientId}, Visit #${visitId}...`);
        
        // 3. USING PARAMETERS IN API REQUESTS:
        // Notice how we dynamically inject the URL parameters into our endpoint call!
        const response = await optometryApiClient.get(`/patients/${patientId}/visits/${visitId}`);
        setVisitData(response.data);
        
      } catch (err) {
        console.error("Failed to load visit data:", err);
        setError("⚠️ Visit record not found in the optical database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDynamicVisitRecord();
  }, [patientId, visitId]); // 👈 CRITICAL PRO-TIP: Include params in dependency array!

  // --- UI RENDER: LOADING STATE ---
  if (isLoading) {
    return (
      <div className="p-12 text-center font-mono text-blue-400 animate-pulse">
        ⏳ Loading optical audit for Patient <span className="font-bold text-white">#{patientId}</span> (Visit: <span className="font-bold text-white">{visitId}</span>)...
      </div>
    );
  }

  // --- UI RENDER: ERROR/NOT FOUND STATE ---
  if (error || !visitData) {
    return (
      <div className="p-8 bg-slate-900 border border-red-500/30 rounded-2xl text-center font-mono max-w-md mx-auto">
        <p className="text-red-400 text-sm mb-4">{error}</p>
        <button onClick={() => navigate('/patients')} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer">
          ⬅️ Back to Patient Vault
        </button>
      </div>
    );
  }

  // --- UI RENDER: SUCCESS DYNAMIC DASHBOARD ---
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-white max-w-2xl mx-auto shadow-2xl">
      
      {/* Header showing the extracted dynamic IDs */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="text-xs text-blue-400 uppercase tracking-wider block font-bold">Dynamic Clinical Audit</span>
          <h2 className="text-xl font-extrabold text-slate-100 mt-1">👁️ Visit #{visitId} Details</h2>
        </div>
        <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
          <span className="text-[10px] text-slate-500 block">Patient File ID</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">#{patientId}</span>
        </div>
      </div>

      {/* Dynamic Data Content */}
      <div className="space-y-4">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
          <span className="text-xs text-slate-400">Examined By:</span>
          <span className="text-sm font-bold text-emerald-400">{visitData.doctorName || "Dr. Optometrist"}</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Refraction Readings (OD / OS):</span>
          <div className="text-lg font-bold text-white flex justify-between mt-2">
            <span>Right Eye (OD): <span className="text-cyan-400">{visitData.rightEye || "-1.50 SPH"}</span></span>
            <span>Left Eye (OS): <span className="text-blue-400">{visitData.leftEye || "-2.00 SPH"}</span></span>
          </div>
        </div>
      </div>

      {/* Quick navigation to view NEXT patient's same visit number! */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          ⬅️ Previous Screen
        </button>

        <button 
          onClick={() => navigate(`/patients/${Number(patientId) + 1}/visits/${visitId}`)} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20"
        >
          Next Patient (# {Number(patientId) + 1}) ➡️
        </button>
      </div>

    </div>
  );
};

export default DynamicVisitViewer;