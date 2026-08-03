// =========================================================================
// File: src/app/DashboardView.tsx
// Description: Consuming our Generic List with different domain types
// =========================================================================
import React from 'react';
import { GenericDataList } from './GenericDataList';
import { Patient, LensStockItem } from '../02_Interface_Declaration/api';

export const DashboardView = () => {
  // Simulated data sets
  const patientsList: Patient[] = [
    { id: "P-1", fullName: "Ahmed Mahmoud", phone: "07901112233" },
    { id: "P-2", fullName: "Khalid Youssef", phone: "07804445566" }
  ];

  const lensesList: LensStockItem[] = [
    { barcode: "RAY-01", brand: "Ray-Ban Titanium", priceUSD: 180, inStock: true },
    { barcode: "OAK-02", brand: "Oakley Sport", priceUSD: 210, inStock: true }
  ];

  return (
    <div className="p-8 bg-slate-950 min-h-screen flex flex-col md:flex-row gap-6 justify-center items-start">
      
      {/* 
        * MECHANIC: Component Generics Implementation
        * By specifying `<Patient>`, we explicitly pass the Patient interface to the component's generic type T.
        * This ensures `items` only accepts `Patient[]` and `renderItem` receives a `Patient` object.
        */}
      {/* 1. Using the exact same component for PATIENTS */}
      <GenericDataList<Patient> // Inline: T is set to Patient
        title="Waiting Patients List"
        items={patientsList}
        renderItem={(patient) => ( // Inline: TS knows 'patient' has fullName and phone properties
          <div>
            <p className="font-bold text-slate-200">{patient.fullName}</p>
            <p className="text-[10px] text-slate-500">📞 {patient.phone}</p>
          </div>
        )}
        onSelectItem={(patient) => alert(`Selected Patient: ${patient.fullName}`)}
      />

      {/* 2. Using the exact same component for LENSES */}
      <GenericDataList<LensStockItem> // Inline: T is set to LensStockItem
        title="Quick Glasses Inventory"
        items={lensesList}
        renderItem={(lens) => (
          <div className="flex justify-between w-full pr-3">
            <span className="font-bold text-amber-300">{lens.brand}</span>
            <span className="text-emerald-400 font-extrabold">${lens.priceUSD}</span>
          </div>
        )}
        onSelectItem={(lens) => alert(`Selected Frame: ${lens.brand} for $${lens.priceUSD}`)}
      />

    </div>
  );
};