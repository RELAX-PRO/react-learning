# 05_useMemo

> **💡 How to Imagine This:**
> Think of `useMemo` as saving the answer to a really hard math problem. If someone asks you to calculate 2345 * 8769, you do it once, write the answer on a card, and just show the card the next time they ask—as long as the numbers haven't changed.

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
