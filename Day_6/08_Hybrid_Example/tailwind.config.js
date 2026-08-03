// =========================================================================
// File: tailwind.config.js (Step 2: Mapping Variables to Tailwind Classes)
// =========================================================================

/*
 * Tailwind Configuration Mechanics:
 * This configuration file customizes how Tailwind CSS operates.
 * - 'content': specifies paths to files that contain Tailwind classes, enabling unused class purging.
 * - 'theme.extend': allows injecting custom CSS variables or values into Tailwind's default design system.
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Toggling dark mode manually via a 'class' applied to the root element
  darkMode: 'class', // تفعيل الوضع الليلي عن طريق الكلاس
  theme: {
    extend: {
      colors: {
        // ربط أسماء كلاسات Tailwind بمتغيرات CSS القياسية:
        'clinic-primary': 'var(--clinic-primary)',
        'clinic-surface': 'var(--clinic-surface)',
        'clinic-text': 'var(--clinic-text)',
      }
    },
  },
  plugins: [],
}