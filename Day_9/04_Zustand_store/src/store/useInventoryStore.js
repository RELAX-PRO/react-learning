// =========================================================================
// File 1: src/store/useInventoryStore.js (The Ultra-Light Zustand Vault)
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Zustand Store Configuration
  =============================================================================
  Zustand provides a very lightweight approach to global state management.
  We use the `create` function which gives us a `set` method. We define our 
  state (like `frames`) and our actions (like `addFrame` and `sellFrame`) 
  in the same object. Zustand handles immutability for us to some extent, 
  but we still need to write immutable updates (e.g. using map/spread) 
  unless we use middleware like Immer.
  =============================================================================
*/
import { create } from 'zustand';

// 1. We create a custom hook directly using `create`:
// Inline Comment: `create` takes a callback receiving a `set` function to update state
export const useInventoryStore = create((set) => ({
  
  // --- STATE (The Data) ---
  frames: [
    { id: "RAY-01", brand: "Ray-Ban Aviator", price: 180, stock: 15 },
    { id: "OAK-09", brand: "Oakley Sport", price: 210, stock: 8 }
  ],
  totalValue: 4380,

  // --- ACTIONS (The Setters) ---
  // To update state, we simply call `set()` and pass the new state!
  // Inline Comment: Merging new state with old state, similar to class component setState
  addFrame: (newFrame) => set((state) => ({
    frames: [...state.frames, newFrame],
    totalValue: state.totalValue + (newFrame.price * newFrame.stock)
  })),

  // Inline Comment: Using map to immutably update the stock of the specific frame
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