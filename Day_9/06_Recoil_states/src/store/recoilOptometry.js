// =========================================================================
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Recoil State Architecture
  =============================================================================
  Recoil introduces 'atoms' and 'selectors'. 
  - `atom`: A piece of state. It requires a unique key and a default value.
  - `selector`: Derived state. It computes a value based on one or more atoms.
    When the dependent atoms change, the selector re-evaluates automatically.
  =============================================================================
*/
import { atom, selector } from 'recoil';

// Inline Comment: An atom representing the patient's eye power
export const eyePowerState = atom({
  key: 'eyePowerState', // Unique ID (with respect to other atoms/selectors)
  default: -1.50, // Initial value
});

// Inline Comment: A selector deriving diagnostic information based on eyePowerState
export const diagnosticState = selector({
  key: 'diagnosticState', // Unique ID for this selector
  get: ({ get }) => {
    // Inline Comment: 'get' subscribes this selector to the atom's changes
    const power = get(eyePowerState);
    return power <= -3.00 ? "🔴 High Myopia" : "🟢 Mild Myopia";
  }
});