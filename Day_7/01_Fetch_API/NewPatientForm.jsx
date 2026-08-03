// =========================================================================
// File: NewPatientForm.jsx
// Description: Demonstrates making a POST request in React to send data to a server.
// =========================================================================
import React, { useState } from 'react';

const NewPatientForm = ({ onPatientAdded }) => {
  // Local state to hold the form input values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    sphereRightOD: '',
    sphereLeftOS: '',
    diagnosis: 'Myopia'
  });

  // States for UI feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Update state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * ============================================================================
   * EXPLANATION: Sending Data via POST Request
   * ============================================================================
   * When sending data to a server (like creating a new record), we use the POST method.
   * The `fetch` API accepts a second options object parameter where we specify:
   * 1. `method: 'POST'` - The HTTP verb to use.
   * 2. `headers` - Metadata about the request. `Content-Type: application/json` tells
   *    the server that we are sending JSON data in the body.
   * 3. `body` - The actual data payload. We must stringify our JavaScript object
   *    into a JSON string before sending it using `JSON.stringify()`.
   * ============================================================================
   */
  // Submit handler triggering the POST Request
  const handleSubmit = async (e) => {
    // Prevent the default browser form submission (which reloads the page)
    e.preventDefault();
    
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('https://api.optical-clinic.com/v1/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Serialize our form state into a JSON string
        body: JSON.stringify(formData),
      });

      // Manually handle HTTP errors since fetch doesn't reject on them
      if (!response.ok) {
        throw new Error(`Server rejected the record. Status: ${response.status}`);
      }

      // Parse the JSON response returned by the server (often the created object)
      const savedPatient = await response.json();
      
      setSuccessMessage(`Patient "${savedPatient.name}" registered successfully with ID #${savedPatient.id}.`);
      
      // Clear form inputs
      setFormData({ name: '', phone: '', sphereRightOD: '', sphereLeftOS: '', diagnosis: 'Myopia' });
      
      // Notify the parent component if a callback prop was provided
      if (onPatientAdded) onPatientAdded(savedPatient);
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage("Failed to connect to the database. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white max-w-lg mx-auto shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-blue-400 border-b border-slate-800 pb-3">
        Register New Optical Examination
      </h2>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase">Patient Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>

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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition flex justify-center items-center cursor-pointer mt-6 ${
            isSubmitting 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.99]"
          }`}
        >
          {isSubmitting ? "Encrypting & Sending..." : "Save Record"}
        </button>
      </form>
    </div>
  );
};

export default NewPatientForm;