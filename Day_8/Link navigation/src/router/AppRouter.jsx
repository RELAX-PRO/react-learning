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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- الهيكل الرئيسي (الأب) الذي يغلف كل الشاشات --- */}
        <Route path="/" element={<MainLayout />}>
          
          {/* الشاشة الافتراضية عند فتح التطبيق */}
          <Route index element={<DashboardView />} />
          
          {/* شاشات النظام الفرعية */}
          <Route path="patients" element={<PatientsVault />} />
          <Route path="inventory" element={<InventoryView />} />
          
        </Route>

        {/* --- مسار حماية شاشة 404 لأي رابط خاطئ --- */}
        <Route path="*" element={<NotFoundView />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;