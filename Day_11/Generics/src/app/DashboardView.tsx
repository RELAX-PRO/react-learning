// =========================================================================
// File: src/app/DashboardView.tsx
// Description: Consuming our Generic List with different domain types
// =========================================================================
import React from 'react';
import { GenericDataList } from '../components/GenericDataList';
import { Patient, LensStockItem } from '../types/api';

export const DashboardView = () => {
  // Simulated data sets
  const patientsList: Patient[] = [
    { id: "P-1", fullName: "أحمد محمود", phone: "07901112233" },
    { id: "P-2", fullName: "خالد يوسف", phone: "07804445566" }
  ];

  const lensesList: LensStockItem[] = [
    { barcode: "RAY-01", brand: "Ray-Ban Titanium", priceUSD: 180, inStock: true },
    { barcode: "OAK-02", brand: "Oakley Sport", priceUSD: 210, inStock: true }
  ];

  return (
    <div className="p-8 bg-slate-950 min-h-screen flex flex-col md:flex-row gap-6 justify-center items-start">
      
      {/* 1. Using the exact same component for PATIENTS */}
      <GenericDataList<Patient>
        title="قائمة المرضى المنتظرين"
        items={patientsList}
        renderItem={(patient) => (
          <div>
            <p className="font-bold text-slate-200">{patient.fullName}</p>
            <p className="text-[10px] text-slate-500">📞 {patient.phone}</p>
          </div>
        )}
        onSelectItem={(patient) => alert(`تم اختيار المريض: ${patient.fullName}`)}
      />

      {/* 2. Using the exact same component for LENSES */}
      <GenericDataList<LensStockItem>
        title="مخزون النظارات السريع"
        items={lensesList}
        renderItem={(lens) => (
          <div className="flex justify-between w-full pr-3">
            <span className="font-bold text-amber-300">{lens.brand}</span>
            <span className="text-emerald-400 font-extrabold">${lens.priceUSD}</span>
          </div>
        )}
        onSelectItem={(lens) => alert(`تم اختيار الإطار: ${lens.brand} بسعر $${lens.priceUSD}`)}
      />

    </div>
  );
};