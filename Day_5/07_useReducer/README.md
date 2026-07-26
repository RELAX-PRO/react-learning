# 07_useReducer

> **💡 How to Imagine This:**
> Think of `useReducer` as a specialized command center with a strict instruction manual. Instead of manually updating different pieces of state yourself, you send a formal "action" (like "INCREMENT_SCORE"), and the reducer follows the manual to update everything correctly in one swoop.

## Overview
Complex state logic and structured updates hook.

## Pros & Cons

### Pros
- Great for complex state logic with multiple sub-values.
- Makes state transitions predictable via dispatched actions.
- Keeps business logic outside of the component render cycle.

### Cons
- Requires more boilerplate code than useState.
- Slight learning curve for beginners used to simple setters.
