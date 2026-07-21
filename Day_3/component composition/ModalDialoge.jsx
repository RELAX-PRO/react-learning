// File: ModalDialog.jsx
import React from 'react';

// Notice: Clean destructuring of our slots and the magic children prop!
const ModalDialog = ({ title, footerActionSlot, children }) => {
  return (
    <div className="modal-box">
      
      {/* 1. The Header section */}
      <h2>{title}</h2>
      
      {/* 2. The Main Content Slot (Containment via children prop) */}
      <div className="modal-body">
        {children}
      </div>
      
      {/* 3. The Footer Slot (Custom JSX Slot injection) */}
      <div className="modal-footer">
        {footerActionSlot}
      </div>

    </div>
  );
};

// MANDATORY: Exporting our component so App.jsx can import and render it!
export default ModalDialog;