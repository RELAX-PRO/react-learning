/**
 * ============================================================================
 * BLOCK COMMENT: Function Reference Equality in JavaScript
 * ============================================================================
 * In JavaScript, every time you define a function, a NEW object is created in memory.
 * Even if two functions do exactly the same thing, they are not equal (`===`) 
 * because they point to different memory addresses.
 * 
 * This is why passing inline functions as props in React can cause child components
 * to re-render unnecessarily. React sees a "new" function and assumes the prop changed.
 * `useCallback` solves this by caching the function reference.
 * ============================================================================
 */
console.log((() => {}) === (() => {})) // النتيجة هي: false !
