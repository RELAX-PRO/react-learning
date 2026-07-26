// =========================================================================
// File: ThemeController.jsx (Dynamic CSS Variables Modification)
// =========================================================================
import React, { useState } from 'react';

const ThemeController = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleClinicTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);

    // Access the root <html> element in the DOM
    const rootElement = document.documentElement;

    if (nextMode) {
      // Apply dark mode CSS variables
      rootElement.style.setProperty('--color-surface', '#14203d');
      rootElement.style.setProperty('--color-text-main', '#f8fafc');
      rootElement.style.setProperty('--color-primary', '#3b82f6');
    } else {
      // Apply light mode CSS variables
      rootElement.style.setProperty('--color-surface', '#ffffff');
      rootElement.style.setProperty('--color-text-main', '#0f172a');
      rootElement.style.setProperty('--color-primary', '#1d4ed8');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', borderRadius: 'var(--card-radius)' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Clinic Visual System</h3>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        Current Theme: <strong>{isDarkMode ? "Dark Mode" : "Light Mode"}</strong>
      </p>

      <button
        onClick={toggleClinicTheme}
        style={{
          marginTop: '15px',
          padding: '10px 18px',
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Switch Color Theme
      </button>
    </div>
  );
};

export default ThemeController;