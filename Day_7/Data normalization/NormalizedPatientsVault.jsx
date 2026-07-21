// =========================================================================
// File: components/NormalizedPatientsVault.jsx (Mastering Data Normalization)
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../services/optometryApiClient';

const NormalizedPatientsVault = () => {
  // 1. THE NORMALIZED STATE ARCHITECTURE:
  // Instead of an array [], we store data as an indexed dictionary (byId) + order list (allIds)
  const [patientsState, setPatientsState] = useState({
    byId: {},
    allIds: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndNormalizeData = async () => {
      try {
        setIsLoading(true);
        // Simulating receiving a raw, un-normalized Array from the backend API:
        const response = await optometryApiClient.get('/patients');
        const rawPatientsArray = response.data; // e.g. [{id: 'p1', name: 'Ali'}, {id: 'p2', ...}]

        // 2. THE NORMALIZATION ENGINE (Flattening the Array into an Indexed Object):
        const normalizedData = rawPatientsArray.reduce(
          (acc, currentPatient) => {
            // Use the patient ID as the direct lookup key in the dictionary:
            acc.byId[currentPatient.id] = currentPatient;
            // Push the ID into the ordered array:
            acc.allIds.push(currentPatient.id);
            return acc;
          },
          { byId: {}, allIds: [] } // Initial empty normalized structure
        );

        // Save the clean, flattened database into React memory:
        setPatientsState(normalizedData);
      } catch (error) {
        console.error("Failed to load records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndNormalizeData();
  }, []);

  // 3. THE O(1) SUPERPOWER UPDATE FUNCTION (Zero array looping required!):
  const handleUpdateDiagnosis = (patientId, newDiagnosis) => {
    setPatientsState((prevState) => ({
      ...prevState,
      byId: {
        ...prevState.byId,
        // Direct target modification in 0.0001 ms! Notice we don't use .map() here!
        [patientId]: {
          ...prevState.byId[patientId],
          diagnosis: newDiagnosis,
        },
      },
    }));
  };

  if (isLoading) {
    return <div className="p-8 text-blue-400 font-mono animate-pulse">⚡ Normalizing clinical data vault into O(1) lookup tables...</div>;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-blue-400 border-b border-slate-800 pb-3">
        👁️ Normalized Patient Repository ({patientsState.allIds.length} Records)
      </h2>

      {/* 4. Rendering using the allIds order array to instantly grab from byId dictionary */}
      <div className="space-y-4">
        {patientsState.allIds.map((id) => {
          // Direct O(1) memory lookup for each card:
          const patient = patientsState.byId[id];

          return (
            <div key={id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center shadow-md">
              <div>
                <h4 className="font-bold text-lg text-slate-100">{patient.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Diagnosis: <span className="text-cyan-400 font-bold">{patient.diagnosis}</span></p>
              </div>

              {/* Action button triggering instant O(1) state update */}
              <button
                onClick={() => handleUpdateDiagnosis(id, "Updated Refraction Verified ✅")}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition active:scale-95 cursor-pointer shadow-lg shadow-blue-600/20"
              >
                Quick Verify ⚡
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NormalizedPatientsVault;