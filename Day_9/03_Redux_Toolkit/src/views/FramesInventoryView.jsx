// =========================================================================
// File 4: src/views/FramesInventoryView.jsx (UI consuming Redux State)    |
// =========================================================================
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sellFrame, addFrame } from '../store/inventorySlice';

const FramesInventoryView = () => {
  const { frames, totalValue } = useSelector((state) => state.inventory);
  
  const dispatch = useDispatch();

  const handleSell = (id) => {
    dispatch(sellFrame(id));
  };

  const handleAddNewRayBan = () => {
    const newModel = {
      id: `RAY-${Math.floor(Math.random() * 1000)}`,
      brand: "Ray-Ban Clubmaster",
      price: 200,
      stock: 5
    };
    dispatch(addFrame(newModel));
  };

  return (
    <div className="p-8 bg-slate-900 font-mono text-white max-w-4xl mx-auto rounded-2xl border border-slate-800">
      
      {/* رأس الشاشة مع إجمالي المخزون المالي */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-blue-400">🕶️ Optical Frames Inventory</h2>
          <p className="text-xs text-slate-400 mt-1">Managed via Redux Toolkit Central Vault</p>
        </div>
        <div className="bg-slate-950 px-6 py-3 rounded-xl border border-slate-800 text-right">
          <span className="text-xs text-slate-500 block">Total Vault Value</span>
          <span className="text-2xl font-extrabold text-emerald-400">${totalValue.toLocaleString()}</span>
        </div>
      </div>

      {/* أزرار الإضافة السريعة */}
      <button 
        onClick={handleAddNewRayBan}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg shadow-blue-600/30"
      >
        ➕ Add New Ray-Ban Stock
      </button>

      {/* شبكة عرض النظارات */}
      <div className="grid grid-cols-2 gap-4">
        {frames.map((item) => (
          <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-cyan-400 block">{item.id}</span>
              <h4 className="text-lg font-bold text-slate-200">{item.brand}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Price: <span className="text-white font-bold">${item.price}</span> | Stock: <span className="text-amber-400 font-bold">{item.stock} pcs</span>
              </p>
            </div>

            <button
              onClick={() => handleSell(item.id)}
              disabled={item.stock === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                item.stock > 0 
                   "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20" 
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {item.stock > 0  "🛒 Sell 1 Unit" : "🚫 Out of Stock"}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FramesInventoryView;