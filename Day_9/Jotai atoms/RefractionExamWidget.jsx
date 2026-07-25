// =========================================================================
// File: src/views/RefractionExamWidget.jsx (Consuming Jotai Atoms)
// =========================================================================
import React from 'react';
// 1. Import the Jotai hooks:
import { useAtom, useAtomValue } from 'jotai';
import { 
  rightEyeSphereAtom, 
  leftEyeSphereAtom, 
  averageRefractionAtom, 
  diagnosticSeverityAtom 
} from '../store/optometryAtoms';

const RefractionExamWidget = () => {
  // 2. Read and Write from Primitive Atoms (Just like useState!):
  const [rightEye, setRightEye] = useAtom(rightEyeSphereAtom);
  const [leftEye, setLeftEye] = useAtom(leftEyeSphereAtom);

  // 3. Read-Only from Derived Atoms (No setter needed! They auto-calculate):
  const averagePower = useAtomValue(averageRefractionAtom);
  const severityBadge = useAtomValue(diagnosticSeverityAtom);

  const adjustRightEye = (amount) => {
    // Updating the right eye automatically triggers the Derived Atoms to update instantly!
    setRightEye((prev) => Number((prev + amount).toFixed(2)));
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white font-mono max-w-md mx-auto shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <span className="text-xs text-cyan-400 uppercase tracking-wider font-bold block">Jotai Atomic Engine</span>
        <h2 className="text-xl font-extrabold text-slate-100 mt-1">👁️ Live Refraction Audit</h2>
      </div>

      {/* --- PRIMITIVE ATOMS CONTROLS --- */}
      <div className="space-y-4 mb-6">
        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-400 block">Right Eye (OD)</span>
            <span className="text-lg font-bold text-cyan-400">{rightEye > 0 ? `+${rightEye}` : rightEye} SPH</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => adjustRightEye(-0.25)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition cursor-pointer">-0.25</button>
            <button onClick={() => adjustRightEye(+0.25)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition cursor-pointer">+0.25</button>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-400 block">Left Eye (OS)</span>
            <span className="text-lg font-bold text-blue-400">{leftEye > 0 ? `+${leftEye}` : leftEye} SPH</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setLeftEye(prev => Number((prev - 0.25).toFixed(2)))} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition cursor-pointer">-0.25</button>
            <button onClick={() => setLeftEye(prev => Number((prev + 0.25).toFixed(2)))} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition cursor-pointer">+0.25</button>
          </div>
        </div>
      </div>

      {/* --- DERIVED ATOMS DISPLAY (Auto-calculated!) --- */}
      <div className="p-4 bg-slate-950/50 rounded-xl border border-dashed border-slate-700 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Binocular Average:</span>
          <span className="font-bold text-white">{averagePower} SPH</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
          <span>Diagnostic Status:</span>
          <span className="font-bold text-amber-400">{severityBadge}</span>
        </div>
      </div>

    </div>
  );
};

export default RefractionExamWidget;