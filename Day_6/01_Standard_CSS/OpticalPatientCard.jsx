// =========================================================================
// File: OpticalPatientCard.jsx (React Component using Standard CSS)
// =========================================================================
import React from 'react';

/*
 * React Functional Component Mechanics:
 * This is a standard functional component in React. 
 * It receives 'props' (properties) as an argument, which allows data to pass from a parent component.
 * Here, we use object destructuring directly in the function signature to extract the required properties:
 * name, id, diagnosis, rightEye, and leftEye.
 */

// Standard CSS is imported globally. Avoid class name collisions in large projects.
import './OpticalPatientCard.css';

// Component declaration using an arrow function and inline prop destructuring
const OpticalPatientCard = ({ name, id, diagnosis, rightEye, leftEye }) => {
  return (
    // React uses 'className' instead of the HTML 'class' attribute because 'class' is a reserved keyword in JS.
    <div className="patient-card">
      <div className="patient-header">
        <h3 className="patient-name">{name}</h3>
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