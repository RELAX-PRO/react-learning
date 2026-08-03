// =========================================================================
// File: src/components/PatientMedicalRecord.tsx
// Description: Mastering event Throttling for high-frequency DOM events
// =========================================================================
import React, { useState, useEffect } from 'react';
// ✅ The surgical smart import (Tree-Shaking Friendly!)
import throttle from 'lodash/throttle'; // Only imports the throttle utility for optimal tree-shaking

/**
 * ============================================================================
 * MECHANICS: Event Throttling
 * ----------------------------------------------------------------------------
 * Unlike debouncing (which waits for the user to stop), throttling forces a 
 * function to run at a consistent, limited rate (e.g., maximum once per 300ms).
 * This is crucial for high-frequency events like scrolling, resizing, or mouse
 * movement, which can overwhelm the browser and cause performance lag.
 * ============================================================================
 */
export const PatientMedicalRecord = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. We create the safety valve (the regulator):
    // This function will NOT run more than "once every 300 milliseconds" no matter how fast you scroll!
    const handleScroll = throttle(() => {
      const totalHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
      const currentProgress = (window.scrollY / totalHeight) * 100; // Calculate percentage
      
      setScrollProgress(currentProgress);
      console.log(`⏱️ [Throttled]: Scroll calculated: ${currentProgress.toFixed(0)}%`);
    }, 300); // Fixed rhythm every 300ms, ensuring max 1 execution per 300ms interval

    // 2. Attach the valve to the browser event
    window.addEventListener('scroll', handleScroll);

    // 3. Cleanup when closing the patient page
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // 🔥 Pro step only: turn off the regulator from memory so it doesn't run after closing!
      handleScroll.cancel(); 
    };
  }, []);

  return (
    <div className="relative min-h-[300vh] bg-slate-950 text-white font-mono p-10">
      
      {/* Fixed progress bar at the top of the screen */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-800 z-50">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <h1 className="text-3xl text-cyan-400 font-bold mb-10">
        📜 Detailed Patient Medical Record
      </h1>
      
      <p className="text-slate-400">
        Scroll down and watch the Console. 
        Thanks to Throttling, the browser breathes easily and doesn't calculate the percentage 100 times a second!
      </p>
      
      {/* Extremely long fake content */}
      <div className="mt-96 text-slate-600">... Details of the first examination ...</div>
      <div className="mt-96 text-slate-600">... Lens measurements ...</div>
      <div className="mt-96 text-slate-600">... Previous invoices ...</div>
    </div>
  );
};