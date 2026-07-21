// =========================================================================
// File: ClinicExecutiveDashboard.jsx (Mastering Promise.all in React)
// =========================================================================
import React, { useState, useEffect } from 'react';
import optometryApiClient from '../services/optometryApiClient';

const ClinicExecutiveDashboard = () => {
  // We hold all 3 distinct data sets in one combined state or separate states:
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

        // 🚀 THE PROMISE.ALL SUPERPOWER:
        // Firing 3 simultaneous network requests at the exact same millisecond!
        const [patientsResponse, framesResponse, appointmentsResponse] = await Promise.all([
          optometryApiClient.get('/patients'),
          optometryApiClient.get('/inventory/frames'),
          optometryApiClient.get('/appointments/today')
        ]);

        // When all 3 promises FULFILL successfully, we update the UI once:
        setDashboardData({
          patientsCount: patientsResponse.data.length,
          framesInStock: framesResponse.data.totalStock,
          todayAppointments: appointmentsResponse.data
        });

      } catch (error) {
        // If ANY of the 3 requests REJECTS, Promise.all jumps straight here!
        console.error("Failed to load dashboard metrics simultaneously:", error);
        setErrorMessage("❌ One or more clinic systems failed to respond. Please retry.");
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
          ⚡ Launching parallel promises... Syncing Patients, Inventory & Appointments simultaneously...
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
        📊 Optical Center Executive Summary
      </h2>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Metric 1: Patients */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Total Registered Patients</span>
          <p className="text-3xl font-extrabold text-blue-500">{dashboardData.patientsCount} 👁️</p>
        </div>

        {/* Metric 2: Inventory */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Optical Frames in Vault</span>
          <p className="text-3xl font-extrabold text-emerald-400">{dashboardData.framesInStock} 🕶️</p>
        </div>

      </div>

      {/* Metric 3: Today's Appointments List */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase mb-3">📅 Today's Refraction Appointments</h3>
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