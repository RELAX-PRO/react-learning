// =========================================================================
// File: views/NewPatientForm.jsx (Mastering programmatic useNavigate)
// =========================================================================
import React, { useState } from 'react';
// 1. Import the hook from react-router-dom:
import { useNavigate } from 'react-router-dom';
import optometryApiClient from '../services/optometryApiClient';

const NewPatientForm = () => {
  const [name, setName] = useState('');
  
  // 2. Initialize the navigation engine:
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend vault:
      const response = await optometryApiClient.post('/patients', { name });
      const newPatientId = response.data.id;

      console.log("✅ Record saved! Redirecting doctor to the new profile...");

      // 3. PROGRAMMATIC NAVIGATION:
      // Immediately transport the user to the newly created patient's page!
      navigate(`/patients/${newPatientId}`);
      
    } catch (error) {
      console.error("Failed to save record:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-white max-w-md mx-auto">
      <h3 className="text-lg font-bold text-blue-400 mb-4">✍️ Register New Patient</h3>
      <input
        type="text"
        placeholder="Patient Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm mb-4 text-white focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer">
        Save & Open File 📂
      </button>
    </form>
  );
};

export default NewPatientForm;