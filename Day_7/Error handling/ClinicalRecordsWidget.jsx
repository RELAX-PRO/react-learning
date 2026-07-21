// =========================================================================
// File: components/ClinicalRecordsWidget.jsx (Mastering Error Handling & Retry Logic)
// =========================================================================
import React, { useState, useEffect, useCallback } from 'react';
import optometryApiClient from '../services/optometryApiClient';

const ClinicalRecordsWidget = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 1. Comprehensive Error State (Holds whether there is an error, its type, and UX message):
  const [errorState, setErrorState] = useState({
    hasError: false,
    type: null, // 'NETWORK' | 'SERVER' | 'NOT_FOUND' | 'GENERIC'
    message: ''
  });

  // 2. We wrap the fetcher in useCallback so we can call it again from the "Retry" button!
  const fetchClinicalRecords = useCallback(async () => {
    setIsLoading(true);
    // Reset any previous errors before trying again:
    setErrorState({ hasError: false, type: null, message: '' });

    try {
      const response = await optometryApiClient.get('/clinical-records');
      setRecords(response.data);
    } catch (error) {
      console.error("🚨 [Data Fetch Failure]:", error);

      // 3. INTELLIGENT ERROR PARSING (Distinguishing between the 3 layers):
      if (!error.response) {
        // The request never reached the server (Wi-Fi off, DNS failure, or Timeout)
        setErrorState({
          hasError: true,
          type: 'NETWORK',
          message: '🌐 Network disconnected. Please check the clinic Wi-Fi connection and try again.'
        });
      } else if (error.response.status === 404) {
        // Endpoint or patient resource missing
        setErrorState({
          hasError: true,
          type: 'NOT_FOUND',
          message: '🔍 The requested clinical vault archive could not be found (Error 404).'
        });
      } else if (error.response.status >= 500) {
        // Internal Server Error (Database crash, backend bug)
        setErrorState({
          hasError: true,
          type: 'SERVER',
          message: '⚠️ Optical server temporary outage. Our cloud architects have been alerted.'
        });
      } else {
        // Fallback for any other error (e.g., 400 Bad Request, 403 Forbidden)
        setErrorState({
          hasError: true,
          type: 'GENERIC',
          message: error.response?.data?.message || 'An unexpected clinical database error occurred.'
        });
      }
    } finally {
      setIsLoading(false); // Stop loading spinner whether success or failure!
    }
  }, []);

  // Trigger the fetch automatically when component mounts
  useEffect(() => {
    fetchClinicalRecords();
  }, [fetchClinicalRecords]);

  // 4. CONDITIONAL RENDERING: UI/UX Loading Skeleton
  if (isLoading) {
    return (
      <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center font-mono animate-pulse">
        <p className="text-blue-400">⏳ Establishing secure connection to optical records vault...</p>
      </div>
    );
  }

  // 5. CONDITIONAL RENDERING: The Actionable UX Error Banner!
  if (errorState.hasError) {
    return (
      <div className="bg-slate-900 p-8 rounded-2xl border border-red-500/30 text-center font-mono shadow-xl max-w-md mx-auto">
        
        {/* Dynamic Icon based on Error Type */}
        <div className="text-4xl mb-3">
          {errorState.type === 'NETWORK' ? '🔌' : '🚨'}
        </div>

        <h3 className="text-lg font-bold text-red-400 mb-2">System Connection Alert</h3>
        
        {/* Human-readable explanation */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          {errorState.message}
        </p>

        {/* The Golden UX Pattern: The Retry Button! */}
        <button
          onClick={fetchClinicalRecords}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span>🔄 Retry Connecting to Vault</span>
        </button>
      </div>
    );
  }

  // 6. CONDITIONAL RENDERING: The Happy Path (Data Display)
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        🗂️ Patient Clinical Records ({records.length})
      </h2>

      <div className="space-y-3">
        {records.map((record) => (
          <div key={record.id} className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200">{record.patientName}</h4>
              <p className="text-xs text-slate-400">Diagnosis: {record.diagnosis}</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Verified & Locked
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalRecordsWidget;