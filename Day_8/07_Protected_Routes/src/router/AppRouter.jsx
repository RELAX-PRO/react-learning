// =========================================================================
// File: src/router/AppRouter.jsx (Securing the Route Tree)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute'; // ðŸ‘ˆ 1. Import our Guard
import LoginView from '../views/LoginView';
import DashboardView from '../views/DashboardView';
import PatientsVault from '../views/PatientsVault';
import InventoryView from '../views/InventoryView';

/**
 * AppRouter Component
 * Demonstrates a secured routing architecture.
 * Public routes (like login) are openly accessible.
 * Protected routes are wrapped by the <ProtectedRoute /> component,
 * which enforces authentication checks before rendering its children.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- ðŸŸ¢ PUBLIC ROUTES (Anyone can access) --- */}
        <Route path="/login" element={<LoginView />} />

        {/* --- ðŸ”´ PROTECTED ROUTES (Requires Doctor Token) --- */}
        {/* We wrap our entire MainLayout inside the ProtectedRoute! */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="patients" element={<PatientsVault />} />
            <Route path="inventory" element={<InventoryView />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

