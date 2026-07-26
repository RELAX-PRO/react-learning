# 06_useCallback

## Overview
Memoization of callback functions hook.

## Pros & Cons

### Pros
- Maintains referential equality for functions.
- Prevents unnecessary re-renders of child components wrapped in React.memo.

### Cons
- Same memory overhead as useMemo.
- Often misused when child components aren't memoized, yielding zero benefits.
