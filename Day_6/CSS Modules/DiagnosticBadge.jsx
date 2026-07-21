// =========================================================================
// File: DiagnosticBadge.jsx (React Component utilizing CSS Modules)
// =========================================================================
import React from 'react';
// 1. Importing the stylesheet as a scoped JavaScript object:
import styles from './DiagnosticBadge.module.css';

const DiagnosticBadge = ({ patientId, condition, isAlert }) => {
  return (
    // 2. Accessing classes via object dot-notation: styles.className
    <div className={styles.badgeContainer}>
      <p className={styles.patientText}>
        👁️ File Ref: <strong>{patientId}</strong>
      </p>

      {/* 3. Conditional Styling: Switching classes cleanly dynamically */}
      <span className={isAlert ? styles.statusAlert : styles.statusNormal}>
        {condition}
      </span>
    </div>
  );
};

export default DiagnosticBadge;