// =========================================================================
// File: ClinicExecutiveDashboard.jsx
// Description: Managing concurrent API requests using Promise.all in React.
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../02_Axios_client/services/optometryApiClient'; // Adjusted import

const ClinicExecutiveDashboard = () => {
  // Combine all metrics into one state for simpler management
  const [dashboardData, setDashboardData] = useState({
    patientsCount: 0,
    framesInStock: 0,
    todayAppointments: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadAllDashboardMetrics = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        // Promise.all initiates multiple requests concurrently
        const [patientsResponse, framesResponse, appointmentsResponse] = await Promise.all([
          optometryApiClient.get('/patients'),
          optometryApiClient.get('/inventory/frames'),
          optometryApiClient.get('/appointments/today')
        ]);

        // Updates state only after all promises fulfill successfully
        setDashboardData({
          patientsCount: patientsResponse.data.length,
          framesInStock: framesResponse.data.totalStock,
          todayAppointments: appointmentsResponse.data
        });

      } catch (error) {
        // If any request rejects, the error is caught here
        console.error("Failed to load dashboard metrics concurrently:", error);
        setErrorMessage("One or more clinic systems failed to respond. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAllDashboardMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="p-12 bg-slate-900 rounded-2xl border border-slate-800 text-center font-mono">
        <p className="text-blue-400 text-lg animate-pulse">
          Fetching Patients, Inventory, and Appointments...
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return <div className="p-6 bg-red-500/10 text-red-400 font-mono rounded-xl border border-red-500/30">{errorMessage}</div>;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-white space-y-6">
      <h2 className="text-2xl font-bold text-blue-400 border-b border-slate-800 pb-4">
        Executive Dashboard Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Total Registered Patients</span>
          <p className="text-3xl font-extrabold text-blue-500">{dashboardData.patientsCount}</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Optical Frames in Stock</span>
          <p className="text-3xl font-extrabold text-emerald-400">{dashboardData.framesInStock}</p>
        </div>
      </div>

      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase mb-3">Today's Appointments</h3>
        {dashboardData.todayAppointments.length === 0 ? (
          <p className="text-xs text-slate-500">No appointments scheduled for today.</p>
        ) : (
          <ul className="space-y-2">
            {dashboardData.todayAppointments.map((app, index) => (
              <li key={index} className="text-xs bg-slate-900 p-3 rounded-lg flex justify-between border border-slate-800/80">
                <span className="font-bold text-slate-200">{app.patientName}</span>
                <span className="text-blue-400">{app.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClinicExecutiveDashboard;