// =========================================================================
// Lesson 4: React Hook Typing
// =========================================================================
import React, { useState, useRef } from "react";

// -------------------------------------------------------------------------
// 1. Typing useState
// -------------------------------------------------------------------------

interface LensItem {
  id: string;
  brand: string;
  price: number;
}

export function StateExample() {
  // ✅ By using <LensItem[]> we tell React this empty array will only accept LensItem elements in the future!
  const [lenses, setLenses] = useState<LensItem[]>([]);

  interface PatientProfile {
    name: string;
    sphereRight: number;
  }

  // 🪄 Magic: The variable might contain the patient object, or it might be null (empty) before data loads.
  const [activePatient, setActivePatient] = useState<PatientProfile | null>(null);

  return (
    <div>
      {/* When reading data, TypeScript forces you to use the question mark (?. Optional Chaining) to protect against screen crash if it's null */}
      <p>Patient Name: {activePatient?.name || "Not available"}</p>
    </div>
  );
}

// -------------------------------------------------------------------------
// 2. Typing useRef
// -------------------------------------------------------------------------

export function RefExample() {
  // First usage: Binding useRef to a screen element (DOM Element)
  // We tell TypeScript it will connect to an HTML input field via <HTMLInputElement> and initialize it with null
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const focusOnBarcode = () => {
    // Mandatory protection: We check 'current' because it might be null before the screen renders
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };

  // Second usage: Keeping a value behind the scenes (like a Timer)
  // In the browser, a timer is just a number, or it might be empty (null)
  const timerRef = useRef<number | null>(null);

  const startCountdown = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current); // Cleanup old timer
    
    // Start new timer and save its ID
    timerRef.current = window.setTimeout(() => {
      console.log("Action executed automatically!");
    }, 3000);
  };

  return (
    <div>
      <input ref={barcodeInputRef} type="text" placeholder="Scan barcode..." />
      <button onClick={focusOnBarcode}>Focus Field</button>
      <button onClick={startCountdown}>Start Timer</button>
    </div>
  );
}
