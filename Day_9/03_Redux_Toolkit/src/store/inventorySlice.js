// =========================================================================
// File 1: src/store/inventorySlice.js (The Inventory Vault Department)
// =========================================================================
import { createSlice } from '@reduxjs/toolkit';

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
    addFrame: (state, action) => {
      state.frames.push(action.payload);
      state.totalValue += (action.payload.price * action.payload.stock);
    },

    sellFrame: (state, action) => {
      const frameId = action.payload;
      const targetFrame = state.frames.find(item => item.id === frameId);
      
      if (targetFrame && targetFrame.stock > 0) {
        targetFrame.stock -= 1;
        state.totalValue -= targetFrame.price;
      }
    }
  }
});

export const { addFrame, sellFrame } = inventorySlice.actions;

export default inventorySlice.reducer;