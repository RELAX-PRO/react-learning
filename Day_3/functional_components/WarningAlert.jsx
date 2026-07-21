// File: WarningAlert.jsx
import React from 'react';

// 1. Pro Way: Destructuring props directly inside the function parameters!
const WarningAlert = ({ errorCode, message, isCritical = false }) => {
  return (
    // 2. Correct HTML tag <div> with a proper closing tag </div> at the end
    <div className="alert-box">
      
      {/* 3. In JSX, we ONLY use {} without the $ sign for variables! */}
      <h4>Error Code: [{errorCode}]</h4>
      
      <p>{message}</p>
      
      {/* 4. Excellent use of the && conditional rendering operator! */}
      {isCritical && <p className="critical-text">🚨 ACTION REQUIRED IMMEDIATELY!</p>}
      
    </div>
  );
}; // <-- Don't forget to close the function body!

export default WarningAlert;