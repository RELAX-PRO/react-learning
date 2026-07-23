// =========================================================================
// File: src/router/ProtectedRoute.jsx (The Security Checkpoint)
// =========================================================================
import React from 'react';
// 1. Import Navigate (declarative redirect) and Outlet (to render child screens):
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  // 2. CHECK SECURITY CREDENTIALS:
  // In a production app, you might check AuthContext or Redux state.
  // Here, we check our vault's local storage token:
  const isAuthenticated = Boolean(localStorage.getItem('optical_vault_token'));
  
  // 3. CAPTURE THE ATTEMPTED URL (UX Secret Weapon 🧠):
  const location = useLocation();

  if (!isAuthenticated) {
    console.warn("🛑 Unauthorized access attempt detected! Redirecting to login...");
    
    // 4. INSTANT KICK-OUT:
    // We redirect to "/login".
    // PRO-TIP: "replace" prevents the intruder from pressing browser 'Back 🔙' to get inside!
    // PRO-TIP: "state={{ from: location }}" saves the page they WANTED to visit so we can send them there after login!
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 5. AUTHORIZED: Open the gate and render whatever child screen was requested!
  return <Outlet />;
};

export default ProtectedRoute;