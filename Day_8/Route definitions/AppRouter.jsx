// =========================================================================
// File: router/AppRouter.jsx (Mastering Route Definitions in React)
// =========================================================================
import React from 'react';
// 1. Importing the standard industry tools from react-router-dom:
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing our clinic pages/views:
import ClinicDashboard from '../views/ClinicDashboard';
import PatientsVault from '../views/PatientsVault';
import NewPatientForm from '../views/NewPatientForm';
import FramesInventory from '../views/FramesInventory';
import NotFoundPage from '../views/NotFoundPage';

const AppRouter = () => {
  return (
      <BrowserRouter>
      {/* 2. <BrowserRouter>: The overarching wrapper that connects React to the URL bar */}
      
      {/* Optional: You can put a static Navbar here that stays visible on ALL pages */}
      <header className="bg-slate-950 border-b border-slate-800 p-4 font-mono text-slate-300">
        <span className="text-blue-500 font-bold">👁️ OPTICAL CLINIC OS</span> v2026
      </header>

      <main className="min-h-screen bg-slate-900 p-6 text-white font-mono">
        {/* 3. <Routes>: The intelligent switcher. It looks at the URL and renders only ONE matching route */}
        <Routes>
          
          {/* --- DEFINITION 1: The Home/Root Route --- */}
          {/* When URL is exact "/", render the main executive dashboard */}
          <Route path="/" element={<ClinicDashboard />} />

          {/* --- DEFINITION 2: The Patients Archive Route --- */}
          {/* When URL is "/patients", render the normalized database view */}
          <Route path="/patients" element={<PatientsVault />} />

          {/* --- DEFINITION 3: Nested/Specific Route --- */}
          {/* When URL is "/patients/new", render the form to register eye refraction */}
          <Route path="/patients/new" element={<NewPatientForm />} />

          {/* --- DEFINITION 4: The Optical Inventory Route --- */}
          <Route path="/inventory" element={<FramesInventory />} />

          {/* --- DEFINITION 5: The 404 Catch-All Fallback Route 🚨 --- */}
          {/* The asterisk "*" is a wildcard. If the user types a random URL like "/random-word", this triggers! */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main>

    </BrowserRouter>
  );
};

export default AppRouter;