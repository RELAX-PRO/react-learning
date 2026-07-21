// =========================================================================
// File: router/AppRouter.jsx (Configuring Nested Routes)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PatientProfileLayout from '../views/PatientProfileLayout';
import PatientLensesHistory from '../views/PatientLensesHistory';
import PatientAppointments from '../views/PatientAppointments';
import PatientBilling from '../views/PatientBilling';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- THE PARENT ROUTE (The Persistent Layout) --- */}
        {/* Notice: No self-closing tag here! We open <Route> to wrap child routes inside it */}
        <Route path="/patients/:id" element={<PatientProfileLayout />}>
          
          {/* --- CHILD ROUTE 1: Default View (when URL is exactly /patients/884) --- */}
          {/* The 'index' prop means: render this child by default in the parent's Outlet */}
          <Route index element={<PatientLensesHistory />} />

          {/* --- CHILD ROUTE 2: Lenses Tab (/patients/884/lenses) --- */}
          <Route path="lenses" element={<PatientLensesHistory />} />

          {/* --- CHILD ROUTE 3: Appointments Tab (/patients/884/appointments) --- */}
          <Route path="appointments" element={<PatientAppointments />} />

          {/* --- CHILD ROUTE 4: Billing Tab (/patients/884/billing) --- */}
          <Route path="billing" element={<PatientBilling />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;