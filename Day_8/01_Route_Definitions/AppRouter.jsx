// =========================================================================
// File: router/AppRouter.jsx (Mastering Route Definitions in React)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ClinicDashboard from '../views/ClinicDashboard';
import PatientsVault from '../views/PatientsVault';
import NewPatientForm from '../views/NewPatientForm';
import FramesInventory from '../views/FramesInventory';
import NotFoundPage from '../views/NotFoundPage';

/**
 * AppRouter Component
 * This component is the root of the application's routing mechanism.
 * It uses 'react-router-dom' to synchronize the UI with the browser's URL.
 * The BrowserRouter provides the routing context to all its children,
 * while Routes works as a switch to render the correct component based on the current path.
 */
const AppRouter = () => {
  return (
    // BrowserRouter connects React Router to the browser URL bar and history.
    <BrowserRouter>
      {/* Header remains persistent across all routes */}
      <header className="bg-slate-950 border-b border-slate-800 p-4 font-mono text-slate-300">
        <span className="text-blue-500 font-bold">ðŸ‘ ï¸  OPTICAL CLINIC OS</span> v2026
      </header>

      <main className="min-h-screen bg-slate-900 p-6 text-white font-mono">
        // Routes checks the current URL and renders the first matching Route.
        <Routes>
          // Each Route maps one path to one screen.
          {/* Exact path match for the root URL */}
          <Route path="/" element={<ClinicDashboard />} />
          {/* Path match for the patients list */}
          <Route path="/patients" element={<PatientsVault />} />
          <Route path="/patients/new" element={<NewPatientForm />} />
          <Route path="/inventory" element={<FramesInventory />} />
          {/* The '*' path acts as a catch-all (wildcard) for undefined routes, effectively rendering a 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRouter;

