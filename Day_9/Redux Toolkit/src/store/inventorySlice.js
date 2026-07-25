// =========================================================================
// File 1: src/store/inventorySlice.js (The Inventory Vault Department)
// =========================================================================
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  frames: [
    { id: "RAY-01", brand: "Ray-Ban Aviator", price: 180, stock: 15 },
    { id: "OAK-09", brand: "Oakley Sport", price: 210, stock: 8 }
  ],
  totalValue: 4380 // إجمالي قيمة المخزون بالدولار
};

const inventorySlice = createSlice({
  name: 'inventory', // اسم الشريحة في البنك
  initialState,
  
  // 🧠 REDUCERS: الموظفون الذين يحق لهم تعديل الخزنة!
  reducers: {
    // 1. أمر إضافة إطار نظارة جديد:
    addFrame: (state, action) => {
      // سر مهني خطير من Redux Toolkit: 
      // بفضل محرك مخفي اسمه (Immer.js)، يمكنك عمل push مباشرة بأمان تام دون خوف من كسر Immutability!
      state.frames.push(action.payload);
      state.totalValue += (action.payload.price * action.payload.stock);
    },

    // 2. أمر بيع نظارة (تقليل المخزون بمقدار 1):
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

// نصدّر الأوامر (Actions) لكي تضغط عليها الأزرار في واجهة React:
export const { addFrame, sellFrame } = inventorySlice.actions;

// نصدّر الموظف المنفذ (Reducer) لكي نربطه بالخزنة الرئيسية:
export default inventorySlice.reducer;