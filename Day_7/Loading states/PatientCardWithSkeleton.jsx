// =========================================================================
// File: components/PatientCardWithSkeleton.jsx (Modern Loading State UI)
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../services/optometryApiClient';

// 1. THE SKELETON COMPONENT (Mirrors the exact geometry of the real card!):
const PatientCardSkeleton = () => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/60 shadow-lg animate-pulse">
      <div className="flex justify-between items-start">
        {/* Placeholder for Patient Name */}
        <div className="h-6 bg-slate-800 rounded-lg w-48 mb-2"></div>
        {/* Placeholder for ID Badge */}
        <div className="h-5 bg-slate-800 rounded-full w-16"></div>
      </div>

      {/* Placeholder for Email */}
      <div className="h-4 bg-slate-800/80 rounded w-36 mt-4"></div>
      
      {/* Placeholder for Diagnosis box */}
      <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800/30">
        <div className="h-3 bg-slate-800 rounded w-24 mb-2"></div>
        <div className="h-5 bg-blue-900/20 rounded w-32"></div>
      </div>
    </div>
  );
};

// 2. THE REAL COMPONENT (With Independent Loading State):
const PatientCardWithSkeleton = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        setIsLoading(true);
        // Simulating network delay to showcase the sleek skeleton:
        const response = await optometryApiClient.get(`/patients/${patientId}`);
        setPatient(response.data);
      } catch (err) {
        setError("Failed to load patient record.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSinglePatient();
  }, [patientId]);

  // 3. Conditional Rendering: Show Skeleton while waiting!
  if (isLoading) {
    return <PatientCardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl font-mono text-sm">
        ❌ {error}
      </div>
    );
  }

  // 4. Render the real UI seamlessly in the exact same footprint!
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg hover:border-blue-500/50 transition duration-300 font-mono text-white">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-slate-100">{patient.name}</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
          ID: #{patient.id}
        </span>
      </div>

      <p className="text-xs text-slate-400 mt-2">📧 {patient.email}</p>
      
      <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
        <span className="text-[10px] text-slate-500 uppercase block">Refraction Diagnosis</span>
        <span className="text-sm font-bold text-cyan-400">{patient.diagnosis || "Myopia & Astigmatism"}</span>
      </div>
    </div>
  );
};

export default PatientCardWithSkeleton;