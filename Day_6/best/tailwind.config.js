// =========================================================================
// File: tailwind.config.js (Step 2: Mapping Variables to Tailwind Classes)
// =========================================================================
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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