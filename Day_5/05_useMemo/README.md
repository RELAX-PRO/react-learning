# 05_useMemo

## Overview
Memoization of expensive calculations hook.

## Pros & Cons

### Pros
- Prevents expensive calculations on every render.
- Optimizes performance for heavy data processing.

### Cons
- Adds memory overhead for caching.
- Can actually slow down simple computations due to hook overhead.
- Often prematurely optimized by beginners.
