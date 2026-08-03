// =========================================================================
// File: DiagnosticBadge.jsx (React Component utilizing CSS Modules)
// =========================================================================
import React from 'react';

// Importing the stylesheet as a scoped JavaScript object.
// This scopes the CSS classes locally to this component, preventing naming collisions.
import styles from './DiagnosticBadge.module.css';

/*
 * Component Props and Conditional Rendering:
 * This component receives props and uses them to determine how to render the UI.
 * CSS Modules ensure that the 'styles' object contains uniquely generated class names,
 * providing encapsulation and preventing global scope leakage.
 */

// Component utilizing props: patientId, condition, and a boolean isAlert
const DiagnosticBadge = ({ patientId, condition, isAlert }) => {
  return (
    // Access classes via object dot-notation: styles.className
    <div className={styles.badgeContainer}>
      <p className={styles.patientText}>
        File Ref: <strong>{patientId}</strong>
      </p>

      {/* Conditional Styling: Dynamically applying classes based on state/props */}
      {/* Uses a ternary operator (condition ? true_value : false_value) to apply different styles dynamically */}
      <span className={isAlert ? styles.statusAlert : styles.statusNormal}>
        {condition}
      </span>
    </div>
  );
};

export default DiagnosticBadge;