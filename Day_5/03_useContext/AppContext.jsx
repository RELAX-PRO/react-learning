/**
 * ============================================================================
 * BLOCK COMMENT: Creating a Context
 * ============================================================================
 * `createContext` creates a Context object. When React renders a component that
 * subscribes to this Context object it will read the current context value from
 * the closest matching Provider above it in the tree.
 * ============================================================================
 */

// =========================================================================
// File 1: AppContext.js (Step 1: Creating the Broadcast Channel)
// =========================================================================
import { createContext } from 'react';

// We create and export the context so any component can tune in to this channel:
// The argument (null here) is the default value used if no Provider is found above.
export const AppContext = createContext(null);