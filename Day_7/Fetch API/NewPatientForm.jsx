// =========================================================================
// File: NewPatientForm.jsx (Real-world POST Request in React)
// =========================================================================
import React, { useState } from 'react';

const NewPatientForm = ({ onPatientAdded }) => {
  // 1. Local state to hold the form input values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    sphereRightOD: '',
    sphereLeftOS: '',
    diagnosis: 'Myopia' // Default diagnosis
  });

  // 2. States for UI feedback (Loading button & Success message)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Helper function to update state when user types in any input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. The Submit Handler: Triggering the POST Request!
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent traditional page reload!
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Sending the mailman with our configuration object:
      const response = await fetch('https://api.optical-clinic.com/v1/patients', {
        method: 'POST', // 1. Specify action type
        headers: {
          'Content-Type': 'application/json', // 2. Put the shipping label
        },
        body: JSON.stringify(formData), // 3. Pack the JavaScript object into stringified JSON
      });

      // Check if the server accepted our package successfully (Status codes 200-299)
      if (!response.ok) {
        throw new Error(`Server rejected the record! Status: ${response.status}`);
      }

      // Unpack the server confirmation (Usually returns the newly created record with an assigned ID)
      const savedPatient = await response.json();
      
      console.log("Successfully locked in vault:", savedPatient);
      setSuccessMessage(`✅ Patient "${savedPatient.name}" registered successfully with ID #${savedPatient.id}!`);
      
      // Clear the form inputs after successful submission
      setFormData({ name: '', phone: '', sphereRightOD: '', sphereLeftOS: '', diagnosis: 'Myopia' });
      
      // Optional: Notify parent component to update the UI table
      if (onPatientAdded) onPatientAdded(savedPatient);

    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage("❌ Failed to connect to the clinic database. Please check internet connection.");
    } finally {
      setIsSubmitting(false); // Stop the loading spinner on the button
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-lg mx-auto shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-blue-400 border-b border-slate-800 pb-3">
        📝 Register New Optical Examination
      </h2>

      {/* Alert Banners for Success or Error */}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
          {errorMessage}
        </div>
      )}

      {/* The Clinical Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Patient Name Input */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase">Patient Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Majed Al-Iraqi"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Optical Measurements Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Right Eye (OD)</label>
            <input
              type="text"
              name="sphereRightOD"
              required
              value={formData.sphereRightOD}
              onChange={handleChange}
              placeholder="-1.75"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-blue-400 font-bold focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Left Eye (OS)</label>
            <input
              type="text"
              name="sphereLeftOS"
              required
              value={formData.sphereLeftOS}
              onChange={handleChange}
              placeholder="-2.25"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-cyan-400 font-bold focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition flex justify-center items-center cursor-pointer mt-6 ${
            isSubmitting 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.99]"
          }`}
        >
          {isSubmitting ? "⏳ Encrypting & Sending to Vault..." : "Save Record to Database 🔒"}
        </button>
      </form>
    </div>
  );
};

export default NewPatientForm;