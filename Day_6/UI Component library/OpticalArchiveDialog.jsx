// =========================================================================
// File: OpticalArchiveDialog.jsx (Using Modern UI Component Library Pattern)
// =========================================================================
import React, { useState } from 'react';
// Importing pre-built accessible primitives (Simulating modern shadcn/ui or Radix UI):
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from './components/ui/dialog'; // Notice: Imported from YOUR own project folder!

const OpticalArchiveDialog = ({ patientName, patientId, onConfirmArchive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => {
    onConfirmArchive(patientId);
    setIsOpen(false); // Close modal automatically after action
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
      {/* 1. The Trigger Button: Automatically handles accessibility and click events */}
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm rounded-xl transition shadow-lg shadow-red-600/20">
          Archive Record 🗑️
        </button>
      </DialogTrigger>

      {/* 2. The Modal Content: Comes with built-in backdrop blur, Escape key close, and Focus Trap! */}
      <DialogContent className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md text-white font-mono shadow-2xl">
        
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-red-400">
            ⚠️ Confirm Clinical Archiving
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400 mt-2">
            You are about to move the optometry records for patient <strong className="text-white">{patientName}</strong> (Ref: {patientId}) into the deep storage vault. This action can be reversed later by an administrator.
          </DialogDescription>
        </DialogHeader>

        {/* Optical summary box styled natively with Tailwind */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 mb-6">
          <p>Status: <span className="text-yellow-400">Pending Verification</span></p>
          <p>Action: <span className="text-red-400">Move to Cold Storage</span></p>
        </div>

        {/* 3. Footer Action Buttons */}
        <DialogFooter className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition"
          >
            Cancel
          </button>
          
          <button
            onClick={handleAction}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-red-600/30"
          >
            Yes, Archive File
          </button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default OpticalArchiveDialog;