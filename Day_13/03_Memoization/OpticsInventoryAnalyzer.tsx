// =========================================================================
// File: OpticsInventoryAnalyzer.tsx
// Description: Enterprise Memoization Architecture in Pure React
// =========================================================================
import React, { useState, useMemo, useCallback } from 'react';

export interface OpticsItem {
  readonly id: string;
  readonly brand: string;
  readonly category: "LENS" | "FRAME" | "ACCESSORY";
  readonly priceUSD: number;
  readonly inStock: boolean;
}

// =========================================================================
// 1. COMPONENT MEMOIZATION (React.memo)
// A child component displaying quick stats; wrapped in React.memo so it doesn't re-render
// unless the actual numbers passed to it change!
// =========================================================================
interface StatCardProps {
  readonly label: string;
  readonly value: number | string;
  readonly onCardClick: () => void;
}

const StatCard = React.memo(({ label, value, onCardClick }: StatCardProps) => {
  console.log(`🎨 [Render]: Rendered stat card: ${label}`);
  return (
    <div 
      onClick={onCardClick}
      className="p-4 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-cyan-500 transition"
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold text-cyan-400 mt-1">{value}</p>
    </div>
  );
});

StatCard.displayName = "StatCard"; // Makes it easier to read in React DevTools

// =========================================================================
// Main Parent Component for Inventory Screen
// =========================================================================
interface Props {
  readonly initialInventory: OpticsItem[];
}

export const OpticsInventoryAnalyzer = ({ initialInventory }: Props) => {
  // Fast search state (changes with every keystroke)
  const [searchTerm, setSearchTerm] = useState("");
  // Currency toggle state (display only)
  const [isEuro, setIsEuro] = useState(false);

  // =========================================================================
  // 2. COMPUTATION MEMOIZATION (useMemo)
  // Filtering thousands of items is heavy; we don't want to re-run it when the user
  // clicks the currency toggle (isEuro), but ONLY when searchTerm or inventory changes!
  // =========================================================================
  const filteredInventory = useMemo(() => {
    console.log("🧮 [Heavy Computation]: Filtering massive inventory list...");
    return initialInventory.filter((item) =>
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialInventory, searchTerm]);

  // Calculate total price of filtered items (aggregation protected by useMemo)
  const totalInventoryValueUSD = useMemo(() => {
    return filteredInventory.reduce((sum, item) => sum + item.priceUSD, 0);
  }, [filteredInventory]);

  // =========================================================================
  // 3. FUNCTION REFERENCE MEMOIZATION (useCallback)
  // We pass this function to the child component (StatCard) which is protected by React.memo;
  // If we didn't use useCallback, the memo would break and the card would re-render on every keystroke!
  // =========================================================================
  const handleStatClick = useCallback(() => {
    alert(`Total items currently displayed: ${filteredInventory.length}`);
  }, [filteredInventory.length]);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl font-mono text-white space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h2 className="text-cyan-400 font-bold">🏢 Optics Inventory Management</h2>
        <button
          type="button"
          onClick={() => setIsEuro(!isEuro)}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-amber-300 transition"
        >
          Toggle Currency: {isEuro ? "EUR €" : "USD $"}
        </button>
      </div>

      {/* Quick Search Field */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search frame or lens brand (e.g., Ray-Ban, Zeiss)..."
          className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Memo Protected Child Components */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Matching Items"
          value={filteredInventory.length}
          onCardClick={handleStatClick}
        />
        <StatCard
          label="Total Inventory Value"
          value={isEuro ? `€${(totalInventoryValueUSD * 0.92).toFixed(1)}` : `$${totalInventoryValueUSD}`}
          onCardClick={handleStatClick}
        />
      </div>

      {/* Filtered Products List */}
      <div className="space-y-2 border-t border-slate-800 pt-4 max-h-48 overflow-y-auto">
        {filteredInventory.map((item) => (
          <div key={item.id} className="p-2.5 bg-slate-950 rounded flex justify-between items-center text-xs border border-slate-800/80">
            <span>{item.brand} <code className="text-slate-500">({item.category})</code></span>
            <span className="text-emerald-400 font-bold">${item.priceUSD}</span>
          </div>
        ))}
      </div>
    </div>
  );
};