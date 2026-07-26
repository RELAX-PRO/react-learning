# 06_useCallback

> **💡 How to Imagine This:**
> Think of `useCallback` as giving your friend a permanent ID card instead of a temporary visitor badge. When you pass a function down to a child component, React normally sees it as a brand-new function every time. `useCallback` ensures it's recognized as the exact same function, preventing unnecessary re-renders.

## Overview
Memoization of callback functions hook.

## Pros & Cons

### Pros
- Maintains referential equality for functions.
- Prevents unnecessary re-renders of child components wrapped in React.memo.

### Cons
- Same memory overhead as useMemo.
- Often misused when child components aren't memoized, yielding zero benefits.
