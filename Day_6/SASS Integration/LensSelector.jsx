// =========================================================================
// File 3: LensSelector.jsx (React Component consuming SASS Module)
// =========================================================================
import React from 'react';
// Importing the compiled SASS module:
import styles from './LensSelector.module.scss';

const LensSelector = ({ onSelectLens }) => {
  const availableLenses = ["Anti-Reflective Blue", "Polycarbonate HD", "Bifocal Standard", "Progressive Pro"];

  return (
    <div className={styles.selectorContainer}>
      <h4 className={styles.title}>👓 Select Optical Lens Type</h4>

      <div className={styles.lensesGrid}>
        {availableLenses.map((lens, index) => (
          <div 
            key={index} 
            className={styles.lensOption}
            onClick={() => onSelectLens(lens)}
          >
            <span>{lens}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LensSelector;