// =========================================================================
// File 2: src/store/index.js (The Master Central Vault)
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Redux Store Configuration
  =============================================================================
  This is the centralized store (the "Vault") in Redux Toolkit (RTK).
  We use `configureStore` to combine all our slices (reducers) into one 
  global state tree. The key `inventory` maps to the state managed by the 
  `inventoryReducer`. Any component wrapped in the Redux `<Provider>` can 
  access this combined state.
  =============================================================================
*/
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';

// Inline Comment: Create and export the master store holding all reducers
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    // patients: patientsReducer,
    // billing: billingReducer
  }
});