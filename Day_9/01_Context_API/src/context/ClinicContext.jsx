// ==========================================
// File 1: src/context/ClinicContext.jsx
// ==========================================
/*
  =============================================================================
  BLOCK COMMENT: React Context Initialization
  =============================================================================
  This file is responsible for initializing the Context. 
  `createContext()` sets up an empty container (a channel) that will hold 
  the state or functions you want to broadcast across your component tree. 
  Exporting it allows other components to either Provide data to it or 
  Consume data from it using the `useContext` hook.
  =============================================================================
*/
import { createContext } from 'react';

// Create the channel once at module scope so every component can use the same context.
// Inline Comment: We can optionally pass a default value to createContext()
export const ClinicContext = createContext();