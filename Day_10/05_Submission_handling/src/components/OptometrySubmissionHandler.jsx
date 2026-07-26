import React, { useState } from 'react';

/**
 * Example 1: Enterprise-grade Form Submission
 * 
 * Demonstrates how to handle loading states, prevent double submissions,
 * clean payloads before sending, and handle server-side errors.
 */
export const OptometrySubmissionHandler = () => {
  // 1. Initial form state (Includes a fake default number to test the server error)
  const [formData, setFormData] = useState({
    patientName: "John Doe",
    phone: "0790-123-4567",
    lensPrice: "150"
  });

  // 2. State for form field errors (merging client and server errors)
  const [errors, setErrors] = useState({});

  // 3. Network Lifecycle State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Universal Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for this field as soon as the user changes it
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  // =========================================================================
  // 🚀 The Submission Engine
  // =========================================================================
  const handleFormSubmit = async (e) => {
    // Shield 1: Prevent browser from refreshing the page and losing state
    e.preventDefault();

    // Shield 2: Prevent double submissions if a request is already in progress
    if (isSubmitting) return;

    // Lock the UI and begin loading
    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);

    try {
      // 1. Payload Transformation (Clean data before sending)
      const apiPayload = {
        name: formData.patientName.trim(),
        rawPhone: formData.phone.replace(/-/g, ''), // Remove dashes from phone
        priceUSD: Number(formData.lensPrice)
      };

      console.log("📦 Sending clean payload to server:", apiPayload);

      // 2. API Call Simulation (Simulating a real network request)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a server-side validation error (e.g., Phone already exists)
          if (apiPayload.rawPhone === "07901234567") {
            reject({
              status: 422,
              fieldErrors: { phone: "❌ This phone number is already registered to another patient!" }
            });
          } else {
            resolve({ status: 200, message: "Invoice saved successfully!" });
          }
        }, 2000); // 2-second delay to simulate slow internet
      });

      // 3. Success State
      setSubmitSuccess(true);
      console.log("✅ Data saved to database successfully!");

    } catch (error) {
      // 4. Error State & API Mapping
      console.error("🚨 Server rejected the submission:", error);

      if (error.status === 422 && error.fieldErrors) {
        // 🪄 The Magic: Inject server errors directly into the UI fields!
        setErrors(error.fieldErrors);
      } else {
        // General error (e.g., Server is completely down - 500)
        setErrors({ general: "An unexpected network error occurred. Please try again later." });
      }

    } finally {
      // 5. Always unlock the UI when the request finishes, regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🚀 Submission Handling</h2>

      {/* General Success Notification */}
      {submitSuccess && (
        <div className="mb-4 p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs text-center font-bold">
          🎉 Patient data and invoice saved successfully!
        </div>
      )}

      {/* General Error Notification */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-950 border border-red-500 rounded-xl text-red-300 text-xs text-center">
          ⚠️ {errors.general}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* --- FIELD 1: NAME --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            disabled={isSubmitting} // Disable field during submission
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm disabled:opacity-50 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* --- FIELD 2: PHONE (Simulates Server Error) --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Phone (Submit default number to see server error):</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm disabled:opacity-50 focus:outline-none transition ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1 font-bold">{errors.phone}</p>}
        </div>

        {/* --- FIELD 3: PRICE --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Lens Price ($):</label>
          <input
            type="number"
            name="lensPrice"
            value={formData.lensPrice}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm disabled:opacity-50 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* --- SUBMIT BUTTON (With Loading State) --- */}
        <button
          type="submit"
          disabled={isSubmitting} // 👈 Master lock to prevent double submissions
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 mt-6"
        >
          {isSubmitting ? (
            <>
              {/* Simple CSS Spinner */}
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Contacting Server...</span>
            </>
          ) : (
            <span>💾 Confirm & Save Invoice</span>
          )}
        </button>
      </form>
    </div>
  );
};