// =========================================================================
// File: OpticalPatientCard.jsx (React Component using Standard CSS)
// =========================================================================
import React from 'react';
// 🔗 Importing the plain CSS file directly into our component:
import './OpticalPatientCard.css';

const OpticalPatientCard = ({ name, id, diagnosis, rightEye, leftEye }) => {
  return (
    // Using 'className' instead of HTML's 'class':
    <div className="patient-card">
      <div className="patient-header">
        <h3 className="patient-name">👁️ {name}</h3>
        <span className="diagnosis-badge">{diagnosis}</span>
      </div>

      <div className="vision-stats">
        <div>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>RIGHT EYE (OD)</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{rightEye}</p>
        </div>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>LEFT EYE (OS)</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{leftEye}</p>
        </div>
      </div>
    </div>
  );
};

export default OpticalPatientCard;