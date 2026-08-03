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

  /**
   * ============================================================================
   * EXPLANATION: Data Normalization
   * ============================================================================
   * APIs usually return arrays of objects. In React, updating a deeply nested object
   * inside an array requires mapping over the entire array, which is inefficient (O(n)).
   * 
   * Data Normalization converts this array into a "dictionary" or "hash map" structure,
   * typically separating the data into `byId` (an object mapping IDs to item data)
   * and `allIds` (an array of just the IDs to maintain sorting/ordering).
   * 
   * This enables instant O(1) lookups and incredibly fast, targeted state updates
   * for specific items without scanning the array.
   * ============================================================================
   */
  useEffect(() => {
    const fetchAndNormalizeData = async () => {
      try {
        setIsLoading(true);
        const response = await optometryApiClient.get('/patients');
        const rawPatientsArray = response.data;

        // Normalize the array response into a dictionary-based structure using reduce
        const normalizedData = rawPatientsArray.reduce(
          (acc, currentPatient) => {
            // Map the entity's ID to its data object
            acc.byId[currentPatient.id] = currentPatient;
            // Maintain an array of just the IDs for rendering lists
            acc.allIds.push(currentPatient.id);
            return acc;
          },
          { byId: {}, allIds: [] } // Initial accumulator state
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

  // Update a single patient by ID efficiently without iterating through arrays (No .map() needed!)
  const handleUpdateDiagnosis = (patientId, newDiagnosis) => {
    setPatientsState((prevState) => ({
      ...prevState,
      byId: {
        ...prevState.byId,
        // Direct lookup of the specific patient using computed property syntax [patientId]
        [patientId]: {
          ...prevState.byId[patientId], // Spread existing patient properties
          diagnosis: newDiagnosis,      // Override the diagnosis
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