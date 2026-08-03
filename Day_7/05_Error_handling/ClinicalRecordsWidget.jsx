// =========================================================================
// File: ClinicalRecordsWidget.jsx
// Description: Advanced error handling and retry logic in React components.
// =========================================================================
import React, { useState, useEffect, useCallback } from 'react';
import optometryApiClient from '../02_Axios_client/services/optometryApiClient'; // Adjusted import

const ClinicalRecordsWidget = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Comprehensive Error State to categorize the failure and provide UX feedback
  const [errorState, setErrorState] = useState({
    hasError: false,
    type: null, // 'NETWORK' | 'SERVER' | 'NOT_FOUND' | 'GENERIC'
    message: ''
  });

  /**
   * ============================================================================
   * EXPLANATION: Advanced Error Handling & useCallback
   * ============================================================================
   * Robust applications don't just fail; they tell the user WHY they failed.
   * Here, we inspect `error.response` provided by Axios to categorize the failure:
   * - No response: The request never reached the server (Network/Offline error).
   * - 404: The endpoint or resource doesn't exist.
   * - 500+: The server crashed or had an internal problem.
   * - 400s: The client sent a bad request.
   * 
   * We wrap this logic in `useCallback` to memoize the function. This allows us to
   * use it inside `useEffect` (as a dependency) AND attach it to a "Retry" button
   * without triggering unnecessary re-renders or infinite loops.
   * ============================================================================
   */
  // Wrap the fetch function in useCallback so it can be re-triggered safely
  const fetchClinicalRecords = useCallback(async () => {
    setIsLoading(true);
    // Reset any previous errors before initiating a new request (crucial for Retries)
    setErrorState({ hasError: false, type: null, message: '' });

    try {
      const response = await optometryApiClient.get('/clinical-records');
      setRecords(response.data);
    } catch (error) {
      console.error("[Data Fetch Failure]:", error);

      // Distinguish between the different layers of failures by checking HTTP status codes
      if (!error.response) {
        // Network failure (offline, DNS issue, request timeout)
        setErrorState({
          hasError: true,
          type: 'NETWORK',
          message: 'Network disconnected. Please check your internet connection and try again.'
        });
      } else if (error.response.status === 404) {
        // Missing resource / Invalid Endpoint
        setErrorState({
          hasError: true,
          type: 'NOT_FOUND',
          message: 'The requested records could not be found (Error 404).'
        });
      } else if (error.response.status >= 500) {
        // Internal server error
        setErrorState({
          hasError: true,
          type: 'SERVER',
          message: 'Server encountered a temporary outage. Our technical team has been notified.'
        });
      } else {
        // Generic client error (e.g. 400 Bad Request, 401 Unauthorized)
        setErrorState({
          hasError: true,
          type: 'GENERIC',
          message: error.response?.data?.message || 'An unexpected database error occurred.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function reference never changes

  useEffect(() => {
    fetchClinicalRecords();
  }, [fetchClinicalRecords]);

  // Loading State UI
  if (isLoading) {
    return (
      <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center font-mono animate-pulse">
        <p className="text-blue-400">Connecting to secure records vault...</p>
      </div>
    );
  }

  // Error State UI with Retry Button
  if (errorState.hasError) {
    return (
      <div className="bg-slate-900 p-8 rounded-2xl border border-red-500/30 text-center font-mono shadow-xl max-w-md mx-auto">
        <h3 className="text-lg font-bold text-red-400 mb-2">System Alert</h3>
        
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {errorState.message}
        </p>

        <button
          onClick={fetchClinicalRecords}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center mx-auto cursor-pointer"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Successful Data Display
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        Patient Clinical Records ({records.length})
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