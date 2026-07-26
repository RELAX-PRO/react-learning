// =========================================================================
// File 2: src/views/QuickSellWidget.jsx (Zero Boilerplate Consumption)
// =========================================================================
import React from 'react';
import { useInventoryStore } from '../store/useInventoryStore';

const QuickSellWidget = () => {
  const frames = useInventoryStore((state) => state.frames);
  const sellFrame = useInventoryStore((state) => state.sellFrame);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white font-mono max-w-md mx-auto">
      <h3 className="text-lg font-extrabold text-cyan-400 mb-4">⚡ Zustand Quick Checkout</h3>
      
      <div className="space-y-3">
        {frames.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-sm font-bold block">{item.brand}</span>
              <span className="text-xs text-slate-400">Stock: {item.stock}</span>
            </div>
            
            {/* استدعاء دالة البيع مباشرة عند الضغط! */}
            <button
              onClick={() => sellFrame(item.id)}
              disabled={item.stock === 0}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              🛒 Sell
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSellWidget;