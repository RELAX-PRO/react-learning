// =========================================================================
// =========================================================================
import { atom, selector } from 'recoil';

export const eyePowerState = atom({
  key: 'eyePowerState',
  default: -1.50,
});

export const diagnosticState = selector({
  key: 'diagnosticState',
  get: ({ get }) => {
    const power = get(eyePowerState);
    return power <= -3.00  "🔴 High Myopia" : "🟢 Mild Myopia";
  }
});