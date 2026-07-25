// =========================================================================
// File 2: src/store/index.js (The Master Central Vault)
// =========================================================================
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';

export const store = configureStore({
  reducer: {
    // نقوم بتركيب قسم المخزون داخل الخزنة الرئيسية تحت اسم "inventory"
    inventory: inventoryReducer,
    // لاحقاً تضيف:
    // patients: patientsReducer,
    // billing: billingReducer
  }
});