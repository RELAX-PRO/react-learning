import React, { useState } from 'react';

/**
 * Example 1: Enterprise-grade Form Submission
 * 
 * Demonstrates how to handle loading states, prevent double submissions,
 * clean payloads before sending, and handle server-side errors.
 * 
 * MECHANICS:
 * This component orchestrates the form submission lifecycle. It uses several
 * state variables to track the form data, potential errors (both client and server),
 * and the network status (loading/success). When the form is submitted, it validates
 * and transforms the data, mimics an asynchronous network request, and properly handles
 * the success or failure of that request, while preventing concurrent submissions.
 */
export const OptometrySubmissionHandler = () => {
  /*
   * State Management:
   * We use React's `useState` hook to manage local component state.
   * `formData` holds the current values of the inputs.
   */
  // 1. Initial form state (Includes a fake default number to test the server error)
  const [formData, setFormData] = useState({
    patientName: "John Doe",
    phone: "0790-123-4567",
    lensPrice: "150"
  });

  /*
   * `errors` holds validation messages. This can include client-side validation
   * failures (though not strictly implemented here) or server-side rejections
   * (e.g., 422 Unprocessable Entity).
   */
  // 2. State for form field errors (merging client and server errors)
  const [errors, setErrors] = useState({});

  /*
   * Network Lifecycle State variables track the current status of the submission.
   * `isSubmitting` prevents duplicate requests and shows loading indicators.
   * `submitSuccess` triggers the success notification upon completion.
   */
  // 3. Network Lifecycle State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /*
   * Universal Change Handler:
   * This function dynamically updates the `formData` state when any input changes.
   * It relies on the `name` attribute of the HTML input matching the state property key.
   */
  // Universal Change Handler
  const handleChange = (e) => {
    // [e.target.name]: e.target.value uses ES6 computed property names to dynamically set the key
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for this field as soon as the user changes it
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null }); // Resetting the specific field error to null
  };

  // =========================================================================
  // 🚀 The Submission Engine
  // =========================================================================
  /*
   * Form Submission Handler:
   * This is an asynchronous function (`async`) that handles the form submission event.
   * It coordinates UI locking, payload preparation, network requests, and response handling.
   */
  const handleFormSubmit = async (e) => {
    // Shield 1: Prevent browser from refreshing the page and losing state
    e.preventDefault(); // Stops the default form submission behavior (page reload)

    // Shield 2: Prevent double submissions if a request is already in progress
    if (isSubmitting) return; // Early return to halt execution if already submitting

    // Lock the UI and begin loading
    setIsSubmitting(true);
    setErrors({}); // Reset all previous errors before attempting a new submission
    setSubmitSuccess(false); // Reset success state

    try {
      /*
       * Payload Transformation:
       * Data from the client often needs to be formatted or sanitized before
       * being sent to the server. Here, strings are trimmed, punctuation is removed,
       * and string numbers are parsed into actual numbers.
       */
      // 1. Payload Transformation (Clean data before sending)
      const apiPayload = {
        name: formData.patientName.trim(), // Remove leading/trailing whitespace
        rawPhone: formData.phone.replace(/-/g, ''), // Remove dashes from phone using regex /-/g
        priceUSD: Number(formData.lensPrice) // Convert string representation to actual Number type
      };

      console.log("📦 Sending clean payload to server:", apiPayload);

      /*
       * Network Simulation:
       * We use a Promise with `setTimeout` to mimic the delay of a real API call.
       * The logic inside simulates the server validating the `rawPhone` field.
       */
      // 2. API Call Simulation (Simulating a real network request)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a server-side validation error (e.g., Phone already exists)
          if (apiPayload.rawPhone === "07901234567") {
            // Reject the promise if the phone matches the failure condition
            reject({
              status: 422,
              fieldErrors: { phone: "❌ This phone number is already registered to another patient!" }
            });
          } else {
            // Resolve the promise if successful
            resolve({ status: 200, message: "Invoice saved successfully!" });
          }
        }, 2000); // 2-second delay to simulate slow internet
      });

      // 3. Success State
      setSubmitSuccess(true); // Triggers the success UI banner
      console.log("✅ Data saved to database successfully!");

    } catch (error) {
      /*
       * Error Handling:
       * The catch block captures any exceptions thrown in the `try` block, or any
       * rejected Promises. We then map server-side error messages back to the UI state.
       */
      // 4. Error State & API Mapping
      console.error("🚨 Server rejected the submission:", error);

      if (error.status === 422 && error.fieldErrors) {
        // 🪄 The Magic: Inject server errors directly into the UI fields!
        setErrors(error.fieldErrors); // Map the field-specific errors back to the `errors` state
      } else {
        // General error (e.g., Server is completely down - 500)
        setErrors({ general: "An unexpected network error occurred. Please try again later." });
      }

    } finally {
      /*
       * Cleanup:
       * The `finally` block executes regardless of whether the `try` block succeeded
       * or failed. This is the ideal place to reset the loading state.
       */
      // 5. Always unlock the UI when the request finishes, regardless of success or failure
      setIsSubmitting(false); // Re-enables form inputs and the submit button
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl">
      <h2 className="text-xl font-extrabold text-cyan-400 mb-6">🚀 Submission Handling</h2>

      {/* General Success Notification */}
      {/* Conditional rendering using logical AND (&&): renders the div only if submitSuccess is true */}
      {submitSuccess && (
        <div className="mb-4 p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs text-center font-bold">
          🎉 Patient data and invoice saved successfully!
        </div>
      )}

      {/* General Error Notification */}
      {/* Conditional rendering for general errors, like 500 server errors */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-950 border border-red-500 rounded-xl text-red-300 text-xs text-center">
          ⚠️ {errors.general}
        </div>
      )}

      {/* Form Submission Binding: onSubmit listens for the submit event triggered by the button */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* --- FIELD 1: NAME --- */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName} // Controlled component: value is tied to state
            onChange={handleChange}
            disabled={isSubmitting} // Disable field during submission to prevent modifications
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
            // Template literal for dynamic className based on error presence
            className={`w-full p-3 bg-slate-950 border rounded-xl text-sm disabled:opacity-50 focus:outline-none transition ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-cyan-500"
            }`}
          />
          {/* Renders the specific error message for the phone field if it exists in the errors object */}
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
          {/* Conditional rendering for the button content (loading spinner vs static text) */}
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