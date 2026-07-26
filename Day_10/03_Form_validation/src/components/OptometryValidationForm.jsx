import React, { useState } from 'react';

/**
 * Example 1: Manual Form Validation in Vanilla React
 * 
 * We use an `errors` state object to track validation messages.
 * When the form is submitted, we run the validation logic. If errors exist, 
 * we update the `errors` state to show them in the UI and prevent submission.
 */
export const OptometryValidationForm = () => {
  // 1. State for form inputs
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    lensPower: "" // e.g., -1.50 or +2.00
  });

  // 2. State for error messages (Starts empty)
  const [errors, setErrors] = useState({});

  // 3. Universal Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // UX Tip: Clear the specific error message as soon as the user starts typing to fix it!
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  // 4. The Validation Engine
  // Returns true if valid, false if invalid.
  const validateForm = () => {
    const newErrors = {}; // Temporary error object

    // Rule 1: Name must be at least 3 characters
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required!";
    } else if (formData.patientName.trim().length < 3) {
      newErrors.patientName = "Name must be at least 3 characters long.";
    }

    // Rule 2: Basic Regex Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required for billing.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format (e.g., name@domain.com).";
    }

    // Rule 3: Lens Power must be a number between -20.00 and +20.00
    const powerNum = parseFloat(formData.lensPower);
    if (!formData.lensPower) {
      newErrors.lensPower = "Please enter the lens power.";
    } else if (isNaN(powerNum) || powerNum < -20 || powerNum > 20) {
      newErrors.lensPower = "Power must be a valid number between -20.00 and +20.00.";
    }

    // Update the UI with any errors found
    setErrors(newErrors);

    // If the object has no keys, there are no errors!
    return Object.keys(newErrors).length === 0;
  };

  // 5. Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isFormValid = validateForm();
    if (isFormValid) {
      console.log("✅ Data is 100% valid! Sending to server...", formData);
      alert("Patient record saved successfully! 👓✨");
      
      // Reset form on success
      setFormData({ patientName: "", email: "", lensPower: "" });
    } else {
      console.log("❌ Form contains errors, submission blocked.");
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🩺 Vision Check Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* --- FIELD 1: PATIENT NAME --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            // Dynamic styling: Turn the border red if there is an error
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.patientName ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {/* Display the error message conditionally */}
          {errors.patientName && <p className="text-red-400 text-xs mt-1">⚠️ {errors.patientName}</p>}
        </div>

        {/* --- FIELD 2: EMAIL --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Email Address:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="patient@optometry.com"
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.email ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">⚠️ {errors.email}</p>}
        </div>

        {/* --- FIELD 3: LENS POWER --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Lens Power (SPH):</label>
          <input
            type="text"
            name="lensPower"
            value={formData.lensPower}
            onChange={handleChange}
            placeholder="e.g. -2.50 or +1.25"
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm focus:outline-none transition ${
              errors.lensPower ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {errors.lensPower && <p className="text-red-400 text-xs mt-1">⚠️ {errors.lensPower}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-sm transition cursor-pointer mt-4"
        >
          ✅ Validate & Save
        </button>
      </form>
    </div>
  );
};
