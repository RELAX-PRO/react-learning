// =========================================================================
// File: src/components/OptometryReceiptHeader.tsx
// Description: A stateless component representing an official optical receipt
// =========================================================================
import React from 'react';

interface Props {
  readonly receiptId: string;
  readonly patientName: string;
  readonly doctorName: string;
  readonly examDate: string;
}

export const OptometryReceiptHeader = ({ 
  receiptId, 
  patientName, 
  doctorName, 
  examDate 
}: Props) => {
  return (
    <div className="p-5 border-2 border-dashed border-slate-700 bg-slate-950 text-white font-mono rounded-lg">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3">
        <div>
          <h2 className="text-lg font-bold text-cyan-400">👁️ Al-Noor Advanced Optics Clinic</h2>
          <p className="text-xs text-slate-400">Mosul, Nineveh - Modern Optics Branch</p>
        </div>
        <span className="bg-slate-800 text-amber-400 px-3 py-1 rounded text-xs font-bold">
          #REC-{receiptId}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <p><strong className="text-slate-500">Patient:</strong> {patientName}</p>
        <p><strong className="text-slate-500">Examining Doctor:</strong> Dr. {doctorName}</p>
        <p className="col-span-2 text-slate-500 text-[10px] mt-2">
          Examination Date & Time: <time className="text-slate-400">{examDate}</time>
        </p>
      </div>
    </div>
  );
};