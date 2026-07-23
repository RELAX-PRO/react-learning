// =========================================================================
// File: views/PatientsVaultSearch.jsx (Mastering Query Strings / Search Params)
// =========================================================================
import React, { useState, useEffect } from 'react';
// 1. Import the URL Search Params hook from react-router-dom:
import { useSearchParams } from 'react-router-dom';
import optometryApiClient from '../services/optometryApiClient';

const PatientsVaultSearch = () => {
  // 2. INITIALIZE SEARCH PARAMS HOOK (Works just like useState!):
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. READ CURRENT VALUES FROM URL (with fallback defaults):
  // If URL is "/patients?diagnosis=myopia&page=2", then:
  const currentDiagnosis = searchParams.get('diagnosis') || 'all'; // Default to 'all'
  const currentPage = Number(searchParams.get('page')) || 1;       // Default to Page 1

  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. FETCH DATA WHEN URL QUERY STRINGS CHANGE:
  useEffect(() => {
    const fetchFilteredVault = async () => {
      try {
        setIsLoading(true);
        console.log(`🌐 Fetching vault API with filter: [${currentDiagnosis}], page: [${currentPage}]...`);
        
        // Notice how we pass query strings directly to our Axios API call!
        const response = await optometryApiClient.get('/patients', {
          params: {
            diagnosis: currentDiagnosis,
            page: currentPage,
            limit: 10
          }
        });
        setPatientsList(response.data.records || []);
      } catch (error) {
        console.error("Failed to fetch filtered vault:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredVault();
  }, [currentDiagnosis, currentPage]); // 👈 Re-run fetch whenever query strings change in URL!

  // 5. UPDATE URL QUERY STRINGS WHEN DOCTOR CLICKS A FILTER BUTTON:
  const handleFilterChange = (newDiagnosis) => {
    // This immediately updates the browser URL to: "/patients?diagnosis=newDiagnosis&page=1"
    // and triggers the useEffect automatically without reloading the page!
    setSearchParams({
      diagnosis: newDiagnosis,
      page: 1 // Reset to page 1 whenever a new filter is applied
    });
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-white max-w-3xl mx-auto shadow-2xl">
      
      {/* --- HEADER & ACTIVE FILTER DISPLAY --- */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-blue-400">👁️ Optical Vault Search</h2>
          <p className="text-xs text-slate-400 mt-1">
            Active Filter: <span className="text-emerald-400 font-bold uppercase">{currentDiagnosis}</span> | Page: <span className="text-cyan-400 font-bold">{currentPage}</span>
          </p>
        </div>
      </div>

      {/* --- FILTER CONTROLS (Updating URL Query Strings) --- */}
      <div className="flex gap-2 mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-xs text-slate-400 self-center mr-2">Filter By Diagnosis:</span>
        
        {['all', 'myopia', 'hyperopia', 'astigmatism'].map((diag) => (
          <button
            key={diag}
            onClick={() => handleFilterChange(diag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
              currentDiagnosis === diag
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            {diag}
          </button>
        ))}
      </div>

      {/* --- RESULTS DISPLAY --- */}
      {isLoading ? (
        <div className="py-12 text-center text-blue-400 animate-pulse text-sm">
          ⏳ Filtering patients by [{currentDiagnosis}]...
        </div>
      ) : (
        <div className="space-y-3 min-h-[250px]">
          {patientsList.map(patient => (
            <div key={patient.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-200">{patient.name}</h4>
                <p className="text-[11px] text-slate-400">Diagnosis: <span className="text-blue-400">{patient.diagnosis}</span></p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-bold">
                ID: #{patient.id}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default PatientsVaultSearch;