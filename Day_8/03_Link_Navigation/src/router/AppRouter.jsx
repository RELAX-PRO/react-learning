// =========================================================================
// File: src/router/AppRouter.jsx (The Master Routing Tree)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import DashboardView from '../views/DashboardView';
import PatientsVault from '../views/PatientsVault';
import InventoryView from '../views/InventoryView';
import NotFoundView from '../views/NotFoundView';

/**
 * AppRouter Component
 * Demonstrates routing with a persistent MainLayout.
 * The parent route '/' renders the MainLayout.
 * Child routes are nested inside the MainLayout, and their components
 * will be rendered wherever the <Outlet /> is placed within the layout.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- Ø§Ù„Ù‡ÙŠÙƒÙ„ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ (Ø§Ù„Ø£Ø¨) Ø§Ù„Ø°ÙŠ ÙŠØºÙ„Ù ÙƒÙ„ Ø§Ù„Ø´Ø§Ø´Ø§Øª --- */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Ø§Ù„Ø´Ø§Ø´Ø© Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© Ø¹Ù†Ø¯ ÙØªØ­ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ */}
          <Route index element={<DashboardView />} />
          
          {/* Ø´Ø§Ø´Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ù… Ø§Ù„ÙØ±Ø¹ÙŠØ© */}
          <Route path="patients" element={<PatientsVault />} />
          <Route path="inventory" element={<InventoryView />} />
          
        </Route>

        {/* --- Ù…Ø³Ø§Ø± Ø­Ù…Ø§ÙŠØ© Ø´Ø§Ø´Ø© 404 Ù„Ø£ÙŠ Ø±Ø§Ø¨Ø· Ø®Ø§Ø·Ø¦ --- */}
        <Route path="*" element={<NotFoundView />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

