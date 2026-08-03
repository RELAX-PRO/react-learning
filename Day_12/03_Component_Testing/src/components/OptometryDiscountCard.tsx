// =========================================================================
// File: src/components/OptometryDiscountCard.tsx
// Description: A React Component for applying immediate clinic discounts
// =========================================================================
/**
 * ==========================================
 * UNDERLYING MECHANICS: REACT STATE & COMPONENT
 * ==========================================
 * This functional component uses the `useState` hook to manage local state.
 * React components re-render whenever their state or props change.
 * The UI is a direct reflection of this internal state.
 */
import React, { useState } from 'react'; // Import the useState hook to add state to the component

interface Props {
  readonly frameModel: string;
  readonly initialPriceUSD: number;
}

export const OptometryDiscountCard = ({ frameModel, initialPriceUSD }: Props) => {
  // `useState` returns an array: [currentValue, setterFunction]
  const [price, setPrice] = useState(initialPriceUSD);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);


  const handleApplyDiscount = () => {
    // Apply 20% discount
    const discountedPrice = price * 0.80;
    setPrice(discountedPrice);
    setIsDiscountApplied(true);
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono max-w-sm">
      <h3 className="text-cyan-400 font-bold">👓 Frame: {frameModel}</h3>
      
      <p className="mt-2 text-sm text-slate-300">
        Current Price: <span data-testid="price-display" className="font-extrabold text-amber-400">${price}</span>
      </p>

      <button
        type="button"
        onClick={handleApplyDiscount}
        disabled={isDiscountApplied}
        className={`mt-4 w-full py-2 rounded text-xs font-bold transition cursor-pointer ${
          isDiscountApplied 
            ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
            : "bg-emerald-600 hover:bg-emerald-500 text-white"
        }`}
      >
        {isDiscountApplied ? "Discount applied ✅" : "Apply 20% discount 🏷️"}
      </button>
    </div>
  );
};