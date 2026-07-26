// =========================================================================
// File: components/ClinicDashboard.jsx
// Description: Component using the configured Axios client to fetch data.
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../services/optometryApiClient';

const ClinicDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchClinicalRecords = async () => {
      try {
        setIsLoading(true);
        
        // Base URL, timeouts, and headers are managed by the Axios instance
        const response = await optometryApiClient.get('/patients');
        
        // Axios automatically parses JSON, accessible via response.data
        setPatients(response.data);
        
      } catch (error) {
        // Axios automatically rejects for non-2xx status codes
        const serverErrorMsg = error.response?.data?.message || "Failed to retrieve records.";
        setErrorMessage(serverErrorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClinicalRecords();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-blue-400 font-mono animate-pulse">Synchronizing with database...</div>;
  }

  if (errorMessage) {
    return <div className="p-6 bg-red-500/10 text-red-400 font-mono border border-red-500/30 rounded-xl">{errorMessage}</div>;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        Active Prescriptions Directory ({patients.length})
      </h2>
      
      <div className="space-y-3">
        {patients.map(patient => (
          <div key={patient.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200">{patient.name}</h4>
              <p className="text-xs text-slate-400">Diagnosis: {patient.diagnosis || 'Standard Refraction'}</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              OD: {patient.sphereRightOD} | OS: {patient.sphereLeftOS}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicDashboard;