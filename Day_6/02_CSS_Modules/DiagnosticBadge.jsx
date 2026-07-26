// =========================================================================
// File: DiagnosticBadge.jsx (React Component utilizing CSS Modules)
// =========================================================================
import React from 'react';

// Importing the stylesheet as a scoped JavaScript object.
// This scopes the CSS classes locally to this component, preventing naming collisions.
import styles from './DiagnosticBadge.module.css';

const DiagnosticBadge = ({ patientId, condition, isAlert }) => {
  return (
    // Access classes via object dot-notation: styles.className
    <div className={styles.badgeContainer}>
      <p className={styles.patientText}>
        File Ref: <strong>{patientId}</strong>
      </p>

      {/* Conditional Styling: Dynamically applying classes based on state/props */}
      <span className={isAlert ? styles.statusAlert : styles.statusNormal}>
        {condition}
      </span>
    </div>
  );
};

export default DiagnosticBadge;