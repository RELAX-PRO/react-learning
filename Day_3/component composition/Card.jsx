// =========================================================================
// File 1: Card.jsx (Our "Picture Frame" Component)
// ==========================================
import React from 'react';

// Notice: We destructure the magic keyword 'children' along with any other props!
const Card = ({ title, children, borderColor = "blue" }) => {
  return (
    <div className={`card-wrapper border-2 border-${borderColor} p-6 rounded-xl shadow-lg my-4`}>
      
      {/* 1. We render our fixed header */}
      <h3 className="card-title text-xl font-bold mb-4 border-b pb-2">{title}</h3>

      {/* 2. THE MAGIC SLOT: Whatever was placed inside tags will unpack here! */}
      <div className="card-body-content">
        {children}
      </div>

    </div>
  );
};

export default Card;