// =========================================================================
// File: src/router/AppRouter.jsx (Implementing Multi-Level RBAC Tree)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginView from '../views/LoginView';
import UnauthorizedView from '../views/UnauthorizedView'; // 👈 403 Screen
import DashboardView from '../views/DashboardView';
import PatientsVault from '../views/PatientsVault';
import ClinicSettingsView from '../views/ClinicSettingsView'; // 👈 Sensitive View
import FinancialAuditView from '../views/FinancialAuditView'; // 👈 Sensitive View

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 🟢 PUBLIC ZONE --- */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/unauthorized" element={<UnauthorizedView />} />

        {/* --- 🔵 TIER 1: GENERAL EMPLOYEES (Doctors + Receptionists) --- */}
        {/* We pass NO allowedRoles, meaning anyone logged in can access! */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            
            <Route index element={<DashboardView />} />
            <Route path="patients" element={<PatientsVault />} />
            
            {/* --- 🔴 TIER 2: TOP SECRET ZONE (Admins & Doctors ONLY!) --- */}
            {/* We nest another ProtectedRoute INSIDE, enforcing allowedRoles! */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR']} />}>
              <Route path="settings" element={<ClinicSettingsView />} />
              <Route path="finance" element={<FinancialAuditView />} />
            </Route>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;