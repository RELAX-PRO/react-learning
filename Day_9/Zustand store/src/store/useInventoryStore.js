// =========================================================================
// File 1: src/store/useInventoryStore.js (The Ultra-Light Zustand Vault)
// =========================================================================
import { create } from 'zustand';

// 1. We create a custom hook directly using `create`:
export const useInventoryStore = create((set) => ({
  
  // --- STATE (The Data) ---
  frames: [
    { id: "RAY-01", brand: "Ray-Ban Aviator", price: 180, stock: 15 },
    { id: "OAK-09", brand: "Oakley Sport", price: 210, stock: 8 }
  ],
  totalValue: 4380,

  // --- ACTIONS (The Setters) ---
  // To update state, we simply call `set()` and pass the new state!
  addFrame: (newFrame) => set((state) => ({
    frames: [...state.frames, newFrame],
    totalValue: state.totalValue + (newFrame.price * newFrame.stock)
  })),

  sellFrame: (id) => set((state) => {
    const target = state.frames.find(item => item.id === id);
    if (!target || target.stock === 0) return state; // Do nothing if out of stock

    return {
      frames: state.frames.map(item => 
        item.id === id ? { ...item, stock: item.stock - 1 } : item
      ),
      totalValue: state.totalValue - target.price
    };
  })

}));