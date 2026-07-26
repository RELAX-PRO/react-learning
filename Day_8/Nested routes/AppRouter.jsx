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
    // BrowserRouter keeps the app synced with the browser URL and history.
    <BrowserRouter>
      <Routes>

        {/* Parent route: it renders the shared layout that stays visible across child pages. */}
        <Route path="/patients/:id" element={<PatientProfileLayout />}>

          {/* index means: render this child when the parent path matches exactly. */}
          <Route index element={<PatientLensesHistory />} />

          {/* Nested child route for the lenses tab. */}
          <Route path="lenses" element={<PatientLensesHistory />} />

          {/* Nested child route for appointments. */}
          <Route path="appointments" element={<PatientAppointments />} />

          {/* Nested child route for billing. */}
          <Route path="billing" element={<PatientBilling />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;