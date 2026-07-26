// =========================================================================
// File: src/store/optometryAtoms.js (Atomic State Architecture)
// =========================================================================
import { atom } from 'jotai';

// 1. PRIMITIVE ATOMS (Basic independent data cells, exactly like useState initial values):
export const rightEyeSphereAtom = atom(-1.50);
export const leftEyeSphereAtom = atom(-2.00);
export const isCylinderRequiredAtom = atom(false);

// Notice we pass a READ function (get) into the atom. It automatically recalculates 
// whenever rightEyeSphereAtom or leftEyeSphereAtom changes!
export const averageRefractionAtom = atom((get) => {
  const od = get(rightEyeSphereAtom);
  const os = get(leftEyeSphereAtom);
  const average = (od + os) / 2;
  
  return Number(average.toFixed(2));
});

// Another Derived Atom that returns a diagnostic badge string:
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