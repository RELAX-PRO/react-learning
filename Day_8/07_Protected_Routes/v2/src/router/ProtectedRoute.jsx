// =========================================================================
// File: src/router/ProtectedRoute.jsx (Upgraded with RBAC Superpowers!)
// =========================================================================
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component (RBAC Upgraded)
 * Not only checks if a user is authenticated (has a token),
 * but also verifies if they are authorized (has the right role).
 * If the user lacks the required role (provided via the allowedRoles prop),
 * they are redirected to a dedicated "Unauthorized" (403) screen instead of login.
 */
// Notice we now accept an array of allowedRoles (e.g., ['ADMIN', 'DOCTOR'])
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  // 1. FETCH USER DATA & TOKEN FROM VAULT MEMORY:
  const token = localStorage.getItem('optical_vault_token');
  
  // In real enterprise SaaS, we store user info (role, name) in JSON format:
  // e.g., { "name": "Dr. Sarah", "role": "ADMIN" } or { "name": "Ali", "role": "RECEPTIONIST" }
  const user = JSON.parse(localStorage.getItem('optical_vault_user') || '{}');

  // --- CHECKPOINT 1: AUTHENTICATION (Is they logged in at all?) ---
  if (!token) {
    console.warn("ðŸ›‘ No token found! Redirecting to login...");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // --- CHECKPOINT 2: AUTHORIZATION / RBAC (Do they have the right badge?) ---
  // If allowedRoles array is provided, check if the current user's role is inside it!
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    
    console.warn(`âš ï¸ Access Denied for role [${user.role}]. Required roles:`, allowedRoles);
    
    // Send them to a clean 403 Forbidden page, NOT the login page!
    return <Navigate to="/unauthorized" replace />;
  }

  // --- PASS AUTHORIZED: Open the gate! ---
  return <Outlet />;
};

export default ProtectedRoute;

