// =========================================================================
// File: LensSelector.jsx (React Component consuming SASS Module)
// =========================================================================
import React from 'react';
// Importing the compiled SASS module. Vite handles SCSS modules automatically out of the box if sass is installed.
import styles from './LensSelector.module.scss';

/*
 * List Rendering in React:
 * React relies on JavaScript's native array methods, like .map(), to render lists of elements.
 * When mapping over an array, React requires a unique 'key' prop for each element
 * so it can efficiently track changes, additions, and removals in the Virtual DOM.
 */
const LensSelector = ({ onSelectLens }) => {
  // Array of options to be rendered dynamically
  const availableLenses = ["Anti-Reflective Blue", "Polycarbonate HD", "Bifocal Standard", "Progressive Pro"];

  return (
    <div className={styles.selectorContainer}>
      <h4 className={styles.title}>Select Optical Lens Type</h4>

      <div className={styles.lensesGrid}>
        {/* Iterating over the array to generate a list of JSX elements */}
        {availableLenses.map((lens, index) => (
          <div 
            // The 'key' prop is essential for React's reconciliation algorithm to identify changes
            key={index} 
            className={styles.lensOption}
            // Inline arrow function to pass the selected lens to the parent's callback handler without invoking it immediately
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