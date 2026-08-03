// =========================================================================
// File 1: Navbar.jsx (Sibling 1: Needs to READ the state)
// =========================================================================
/**
 * MECHANICS: Unidirectional Data Flow & Props
 * React uses a unidirectional (top-down) data flow. Data is passed from parent to child
 * via `props`. Sibling components cannot directly share state with each other. 
 * This Navbar component acts as a "dumb" or presentational component—it doesn't own 
 * the `cartItemsCount` state, it merely receives it as a read-only prop and renders it.
 */
import React from 'react';

const Navbar = ({ cartItemsCount }) => {
  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mosul Tech Store </h1>
      
      {/* This sibling purely receives and displays the lifted state: */}
      <div className="bg-blue-600 px-4 py-2 rounded-full font-mono">
        {/* Inline Comment: Rendering the prop passed down by the parent ShopPage */}
        Cart: {cartItemsCount} Items 
      </div>
    </header>
  );
};

export default Navbar;