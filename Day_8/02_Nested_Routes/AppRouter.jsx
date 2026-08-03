// =========================================================================
// File: router/AppRouter.jsx (Configuring Nested Routes)
// =========================================================================
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PatientProfileLayout from '../views/PatientProfileLayout';
import PatientLensesHistory from '../views/PatientLensesHistory';
import PatientAppointments from '../views/PatientAppointments';
import PatientBilling from '../views/PatientBilling';

/**
 * AppRouter Component - Nested Routing Demonstration
 * This setup showcases how React Router allows components to be nested within each other.
 * By defining a parent route that renders a layout component, child routes can be
 * injected into a specific outlet within that layout, keeping the layout intact while
 * changing the inner content based on the sub-path.
 */
const AppRouter = () => {
  return (
    // BrowserRouter keeps the app synced with the browser URL and history.
    <BrowserRouter>
      <Routes>

        {/* Parent route: it renders the shared layout that stays visible across child pages. */}
        {/* The ':id' is a dynamic URL parameter accessed via useParams() */}
        <Route path="/patients/:id" element={<PatientProfileLayout />}>

          {/* index means: render this child when the parent path matches exactly. */}
          {/* Used as the default nested view when no child path is explicitly provided */}
          <Route index element={<PatientLensesHistory />} />

          {/* Nested child route for the lenses tab. */}
          {/* Matches /patients/:id/lenses */}
          <Route path="lenses" element={<PatientLensesHistory />} />

          {/* Nested child route for appointments. */}
          {/* Matches /patients/:id/appointments */}
          <Route path="appointments" element={<PatientAppointments />} />

          {/* Nested child route for billing. */}
          {/* Matches /patients/:id/billing */}
          <Route path="billing" element={<PatientBilling />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

