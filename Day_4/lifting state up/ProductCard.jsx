// =========================================================================
// File 2: ProductCard.jsx (Sibling 2: Needs to UPDATE the state)
// =========================================================================
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
        onClick={() => onAddToCart(product)} 
        className="mt-4 bg-slate-900 text-white py-2 rounded hover:bg-slate-700 transition"
      >
        + Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;