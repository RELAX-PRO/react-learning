// ==========================================
// File 1: src/context/ClinicContext.jsx
// ==========================================
import { createContext } from 'react';

// Create the channel once at module scope so every component can use the same context.
export const ClinicContext = createContext();