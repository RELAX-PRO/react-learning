// =========================================================================
// File 1: src/store/inventorySlice.js (The Inventory Vault Department)
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Redux Toolkit (RTK) Slice
  =============================================================================
  A "Slice" in RTK bundles together the state, actions, and reducers for a 
  specific feature (in this case, "inventory"). 
  We define the `initialState` (default data), and the `reducers` (the logic 
  to modify the data). RTK uses the "Immer" library under the hood, allowing 
  us to write "mutative" code (like state.frames.push) that safely translates 
  into immutable updates automatically.
  =============================================================================
*/
import { createSlice } from '@reduxjs/toolkit';

// Inline Comment: The default starting state for the inventory feature
const initialState = {
  frames: [
    { id: "RAY-01", brand: "Ray-Ban Aviator", price: 180, stock: 15 },
    { id: "OAK-09", brand: "Oakley Sport", price: 210, stock: 8 }
  ],
  totalValue: 4380
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  
  reducers: {
    // Inline Comment: Reducer action to add a new frame
    addFrame: (state, action) => {
      // Immer allows direct push safely
      state.frames.push(action.payload);
      state.totalValue += (action.payload.price * action.payload.stock);
    },

    // Inline Comment: Reducer action to sell a frame, updating stock and value
    sellFrame: (state, action) => {
      const frameId = action.payload; // action.payload holds the argument passed when dispatching
      const targetFrame = state.frames.find(item => item.id === frameId);
      
      if (targetFrame && targetFrame.stock > 0) {
        targetFrame.stock -= 1;
        state.totalValue -= targetFrame.price;
      }
    }
  }
});

// Inline Comment: Export the auto-generated action creators so components can dispatch them
export const { addFrame, sellFrame } = inventorySlice.actions;

// Inline Comment: Export the reducer to include it in the master store (index.js)
export default inventorySlice.reducer;