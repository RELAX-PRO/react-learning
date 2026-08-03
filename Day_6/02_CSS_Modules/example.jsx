// In Standard CSS, styles are imported globally and classes are strings:
// import './OpticalCard.css';
// <div className="card">...</div>

/*
 * CSS Strategies in React:
 * This example contrasts standard CSS imports with CSS Modules.
 * Standard CSS acts globally, whereas CSS Modules create locally scoped class names
 * by generating unique identifiers at build time, preventing class name collisions.
 */

// In CSS Modules, styles are imported as an object, ensuring local scope:
// import styles from './OpticalCard.module.css';
// <div className={styles.card}>...</div>