# Hooks Fundamentals

This day is the bridge between React components and reusable logic. The focus is not memorizing hooks, but choosing the right hook for the right job.

## Learning order

1. useState hook
2. useEffect hook
3. useContext hook
4. useRef hook
5. useMemo hook
6. useCallback hook
7. useReducer hook

## Decision guide

- Use `useState` for local UI state.
- Use `useEffect` for side effects, data fetching, timers, and subscriptions.
- Use `useContext` when shared data should skip prop drilling.
- Use `useRef` when you need a stable mutable value or direct DOM access.
- Use `useMemo` when a calculation is genuinely expensive.
- Use `useCallback` when a function reference must stay stable for a memoized child.
- Use `useReducer` when updates are more structured than simple state setters.

## What this day should teach

- How each hook solves a different problem
- Why hooks must stay at the top level of a component
- When optimization tools are useful and when they are unnecessary noise
- How to keep hook usage predictable and readable

## Common mistakes

- Replacing every local state with `useReducer`
- Using `useMemo` and `useCallback` without a real performance reason
- Putting side effects in render logic instead of `useEffect`
- Using refs as a substitute for UI state

## Practice checklist

- Build one counter with `useState`
- Fetch one value with `useEffect`
- Move one shared value into context
- Focus one input with `useRef`
- Memoize one expensive calculation
- Pass one memoized handler to a child
- Rewrite one state flow with `useReducer`