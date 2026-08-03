// =========================================================================
// File 2: ProductCard.jsx (Sibling 2: Needs to UPDATE the state)
// =========================================================================
/**
 * MECHANICS: Inverse Data Flow (Passing Callbacks)
 * Since data flows downwards, child components cannot naturally send data up to parents
 * or across to siblings. To solve this, the parent passes down a callback function 
 * (like `onAddToCart`) as a prop. The child component can invoke this callback, effectively 
 * passing data back up to the parent to trigger a state update at the higher level.
 */
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow bg-white flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-green-600 font-semibold">${product.price}</p>
      </div>

      {/* This sibling triggers the action by calling the parent's callback! */}
      <button 
        // Inline Comment: This arrow function prevents immediate execution, calling the parent's function ONLY on click
        onClick={() => onAddToCart(product)} 
        className="mt-4 bg-slate-900 text-white py-2 rounded hover:bg-slate-700 transition"
      >
        + Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;