// =========================================================================
// File 2: src/store/index.js (The Master Central Vault)
// =========================================================================
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    // patients: patientsReducer,
    // billing: billingReducer
  }
});