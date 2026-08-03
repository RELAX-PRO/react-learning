// =========================================================================
// File: src/App.tsx
// Description: Manual Route-Level Code Splitting in Pure React (Vite)
// =========================================================================
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// ❌ The Disastrous Import (merges all pages into one giant file):
// import { OpticsPOSView } from './pages/OpticsPOSView';
// import { AdminReportsView } from './pages/AdminReportsView';

// ✅ The Smart Architectural Import (Code Splitting):
// We tell Vite: "Chop these pages into separate chunk files, and don't load them now!"
const OpticsPOSView = lazy(() => import('./pages/OpticsPOSView'));
const AdminReportsView = lazy(() => import('./pages/AdminReportsView'));

/**
 * ============================================================================
 * MECHANICS: React Suspense & Code Splitting
 * ----------------------------------------------------------------------------
 * Code splitting breaks our app into smaller chunks to improve load times.
 * `React.lazy` dynamically imports components. `Suspense` catches the rendering
 * of these lazy components while they are fetching and provides a fallback UI.
 * ============================================================================
 */
export const App = () => {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-slate-900 text-white flex gap-4">
        <Link to="/pos">Point of Sale 🛒</Link>
        <Link to="/reports">Financial Reports 📊</Link>
      </nav>

      {/* 
        Suspense is the protective wall!
        Since the reports page is chopped off and not in memory,
        when we click on it, fetching it from the network will take milliseconds.
        During this time, Suspense will render the loading screen (fallback) so the app doesn't crash!
      */}
      <Suspense fallback={<div className="p-10 text-cyan-500 font-bold animate-pulse">⏳ Loading screen from server...</div>}>
        <Routes>
          {/* The POS page code won't be loaded until you visit /pos */}
          <Route path="/pos" element={<OpticsPOSView />} />
          
          {/* Heavy charting libraries won't be loaded until you visit /reports */}
          <Route path="/reports" element={<AdminReportsView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};