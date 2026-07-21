// =========================================================================
// File 1: AppContext.js (Step 1: Creating the Broadcast Channel)
// =========================================================================
import { createContext } from 'react';

// We create and export the context so any component can tune in to this channel:
export const AppContext = createContext(null);