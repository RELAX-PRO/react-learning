// =========================================================================
// File: src/store/optometryAtoms.js (Atomic State Architecture)
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Jotai Atomic State
  =============================================================================
  Jotai provides a bottom-up approach to state management. Instead of one 
  monolithic store, state is broken down into small, independent pieces called 
  "atoms".
  - Primitive Atoms hold raw values, much like `useState` default values.
  - Derived Atoms take a function that receives a `get` method, allowing them 
    to automatically recalculate whenever the primitive atoms they depend on change.
  =============================================================================
*/
import { atom } from 'jotai';

// 1. PRIMITIVE ATOMS (Basic independent data cells, exactly like useState initial values):
// Inline Comment: Creating independent atoms holding numerical and boolean values
export const rightEyeSphereAtom = atom(-1.50);
export const leftEyeSphereAtom = atom(-2.00);
export const isCylinderRequiredAtom = atom(false);

// Notice we pass a READ function (get) into the atom. It automatically recalculates 
// whenever rightEyeSphereAtom or leftEyeSphereAtom changes!
// Inline Comment: This derived atom computes the average based on right and left eye atoms
export const averageRefractionAtom = atom((get) => {
  const od = get(rightEyeSphereAtom); // OD: Oculus Dexter (Right Eye)
  const os = get(leftEyeSphereAtom);  // OS: Oculus Sinister (Left Eye)
  const average = (od + os) / 2;
  
  return Number(average.toFixed(2));
});

// Another Derived Atom that returns a diagnostic badge string:
// Inline Comment: Depends on another derived atom (averageRefractionAtom)
export const diagnosticSeverityAtom = atom((get) => {
  const avg = get(averageRefractionAtom);
  if (avg <= -6.00) return "🔴 High Myopia (Severe Risk)";
  if (avg <= -3.00) return "🟡 Moderate Myopia";
  return "🟢 Mild Myopia (Standard Lens)";
});

// other methods can be used outside of the component to read or write atom values without subscribing to them.
// useAtomValue() to read the value of an atom without subscribing to it, 
// and useSetAtom() to get a setter function for an atom without subscribing to it. 
// These hooks are useful when you only need to read or write an atom's value without triggering a re-render of the component.