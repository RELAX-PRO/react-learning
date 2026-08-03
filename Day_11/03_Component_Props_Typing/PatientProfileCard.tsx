// =========================================================================
// File: src/components/PatientProfileCard.tsx
// IMPORTANT: Save this file strictly with a .tsx extension!
// =========================================================================
import React, { useState } from 'react';

// 1. Define the data contract (Zero runtime overhead Blueprint)
interface LensOrder {
  readonly orderId: string;
  brand: string;
  priceUSD: number;
  isBlueLightProtected: boolean;
  notes?: string;
}

// 2. Define component input Props using the contract
/*
 * MECHANIC: Component Props Typing
 * By defining a `Props` interface, we dictate exactly what data this React component needs to function.
 * `React.FC<Props>` (Functional Component) uses this interface to provide type checking and autocompletion
 * for the component's props when it is used by a parent component.
 */
interface Props {
  patientName: string; // Inline: Primitive type constraint
  initialOrder: LensOrder; // Inline: Using another interface as a property type
  onUpdateOrder: (newOrder: LensOrder) => void; // Inline: Typing a callback function
}

export const PatientProfileCard: React.FC<Props> = ({  // Inline: React.FC enforces the return type and props interface
  patientName, 
  initialOrder, 
  onUpdateOrder 
}) => {
  // 3. Bind the state explicitly to the LensOrder interface
  const [order, setOrder] = useState<LensOrder>(initialOrder); // Inline: Generic <LensOrder> locks state structure

  const handleToggleBlueLight = () => {
    const updatedOrder: LensOrder = {
      ...order,
      isBlueLightProtected: !order.isBlueLightProtected
    };
    
    setOrder(updatedOrder);
    onUpdateOrder(updatedOrder);
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-white max-w-sm">
      <h3 className="text-cyan-400 font-bold">Patient: {patientName}</h3>
      
      <div className="mt-3 space-y-1 text-xs text-slate-300">
        <p>Order ID: <span className="text-amber-400 font-bold">{order.orderId}</span></p>
        <p>Brand: {order.brand}</p>
        <p>Price: ${order.priceUSD}</p>
        <p>Blue Light Filter: {order.isBlueLightProtected ? "Yes" : "No"}</p>
      </div>

      <button
        type="button"
        onClick={handleToggleBlueLight}
        className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
      >
        Toggle Blue Light Protection
      </button>
    </div>
  );
};