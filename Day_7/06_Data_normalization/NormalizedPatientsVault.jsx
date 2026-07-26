// =========================================================================
// File: NormalizedPatientsVault.jsx
// Description: Converting fetched array data into a normalized state shape.
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../02_Axios_client/services/optometryApiClient'; // Adjusted import

const NormalizedPatientsVault = () => {
  // Store records using byId (dictionary) and allIds (array) for efficient lookups
  const [patientsState, setPatientsState] = useState({
    byId: {},
    allIds: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndNormalizeData = async () => {
      try {
        setIsLoading(true);
        const response = await optometryApiClient.get('/patients');
        const rawPatientsArray = response.data;

        // Normalize the array response into a dictionary-based structure
        const normalizedData = rawPatientsArray.reduce(
          (acc, currentPatient) => {
            acc.byId[currentPatient.id] = currentPatient;
            acc.allIds.push(currentPatient.id);
            return acc;
          },
          { byId: {}, allIds: [] }
        );

        setPatientsState(normalizedData);
      } catch (error) {
        console.error("Failed to load records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndNormalizeData();
  }, []);

  // Update a single patient by ID efficiently without iterating through arrays
  const handleUpdateDiagnosis = (patientId, newDiagnosis) => {
    setPatientsState((prevState) => ({
      ...prevState,
      byId: {
        ...prevState.byId,
        [patientId]: {
          ...prevState.byId[patientId],
          diagnosis: newDiagnosis,
        },
      },
    }));
  };

  if (isLoading) {
    return <div className="p-8 text-blue-400 font-mono animate-pulse">Normalizing data structure...</div>;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-blue-400 border-b border-slate-800 pb-3">
        Normalized Patient Repository ({patientsState.allIds.length} Records)
      </h2>

      <div className="space-y-4">
        {patientsState.allIds.map((id) => {
          const patient = patientsState.byId[id];

          return (
            <div key={id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center shadow-md">
              <div>
                <h4 className="font-bold text-lg text-slate-100">{patient.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Diagnosis: <span className="text-cyan-400 font-bold">{patient.diagnosis}</span></p>
              </div>

              <button
                onClick={() => handleUpdateDiagnosis(id, "Updated Refraction Verified")}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition active:scale-95 cursor-pointer shadow-lg shadow-blue-600/20"
              >
                Quick Verify
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NormalizedPatientsVault;