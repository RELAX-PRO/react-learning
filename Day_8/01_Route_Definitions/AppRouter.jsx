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

const AppRouter = () => {
  return (
    // BrowserRouter connects React Router to the browser URL bar and history.
    <BrowserRouter>
      <header className="bg-slate-950 border-b border-slate-800 p-4 font-mono text-slate-300">
        <span className="text-blue-500 font-bold">ðŸ‘ï¸ OPTICAL CLINIC OS</span> v2026
      </header>

      <main className="min-h-screen bg-slate-900 p-6 text-white font-mono">
        // Routes checks the current URL and renders the first matching Route.
        <Routes>
          // Each Route maps one path to one screen.
          <Route path="/" element={<ClinicDashboard />} />
          <Route path="/patients" element={<PatientsVault />} />
          <Route path="/patients/new" element={<NewPatientForm />} />
          <Route path="/inventory" element={<FramesInventory />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRouter;

