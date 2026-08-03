/**
 * MECHANICS: Direct vs Functional State Updates
 * - Direct Update: Sets the new state based on a hardcoded value or a known variable. 
 *   Ideal for simple assignments.
 * - Functional Update: Passes a callback that receives the previous state. Essential when 
 *   the new state depends on the immediate prior state, especially when multiple updates 
 *   happen in rapid succession or within asynchronous closures.
 */

// 1. Direct Update (  ):
setCount(10); 

// 2. Functional Update (  ):
setCount((previousState) => {
  // Logic can be written here before returning the new state!
  return previousState + 1;
});

// Or in a clean single-line expression:
setCount(prev => prev + 1);


//  Dangerous way (Might fail if multiple events fire quickly):
const toggleSidebar = () => {
  // Inline comment: Uses outer scope's `isOpen` value. Can be stale if called multiple times rapidly.
  setIsOpen(!isOpen); 
};

//  Immutable & Safe way (Guaranteed to always toggle the real current state):
const toggleSidebar = () => {
  // Inline comment: Safely inverts the most recent state value dynamically.
  setIsOpen(prev => !prev);
};
