// =========================================================================
// File 1: Navbar.jsx (Sibling 1: Needs to READ the state)
// =========================================================================
import React from 'react';

const Navbar = ({ cartItemsCount }) => {
  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mosul Tech Store 🛍️</h1>
      
      {/* This sibling purely receives and displays the lifted state: */}
      <div className="bg-blue-600 px-4 py-2 rounded-full font-mono">
        Cart: {cartItemsCount} Items 🛒
      </div>
    </header>
  );
};

export default Navbar;