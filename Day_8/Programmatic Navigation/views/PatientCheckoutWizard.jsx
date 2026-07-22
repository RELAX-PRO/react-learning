// =========================================================================
// File: views/PatientCheckoutWizard.jsx (Mastering Programmatic Navigation)
// =========================================================================
import React, { useState } from 'react';
// 1. Import the navigation hook:
import { useNavigate } from 'react-router-dom';
import optometryApiClient from '../services/optometryApiClient';

const PatientCheckoutWizard = ({ patientId = "884", amount = "150.00" }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 2. Initialize the programmatic navigation engine:
  const navigate = useNavigate();

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    try {
      // Step A: Execute API call to charge insurance/credit card
      await optometryApiClient.post(`/billing/${patientId}/charge`, { amount });
      
      console.log("💳 Payment Approved! Triggering automated UX redirect...");

      // Step B: ADVANCED PROGRAMMATIC NAVIGATION
      // We transport the doctor to the patient's main vault, but with 2 superpowers:
      navigate(`/patients/${patientId}`, {
        
        // Superpower 1: Replace history so pressing browser 'Back' button 
        // won't bring them back to this payment form (prevents double charging!)
        replace: true,

        // Superpower 2: Pass hidden UX memory state to show a success banner on the next page!
        state: { 
          paymentStatus: 'SUCCESS', 
          message: `Invoice of $${amount} paid successfully!` 
        }
      });

    } catch (error) {
      console.error("Payment failed:", error);
      alert("⚠️ Payment failed. Please check clinic connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. PROGRAMMATIC HISTORY BACK (-1)
  // Allows cancelling the wizard and going to wherever the user came from:
  const handleCancel = () => {
    navigate(-1); // Works exactly like the browser's back button 🔙
  };

  return (
    <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-white max-w-md mx-auto shadow-2xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-lg font-bold text-emerald-400">💳 Checkout & Billing</h3>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-bold">
          Patient #{patientId}
        </span>
      </div>

      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center mb-6">
        <span className="text-xs text-slate-400 block mb-1">Total Optical Due:</span>
        <span className="text-3xl font-extrabold text-white">${amount}</span>
      </div>

      <div className="flex gap-3">
        {/* Cancel triggers navigate(-1) */}
        <button
          onClick={handleCancel}
          disabled={isProcessing}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          ❌ Cancel
        </button>

        {/* Action triggers API + programmatic navigate with replace/state */}
        <button
          onClick={handleProcessPayment}
          disabled={isProcessing}
          className="flex-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/30 flex justify-center items-center gap-2"
        >
          {isProcessing ? "⏳ Charging..." : "✅ Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PatientCheckoutWizard;