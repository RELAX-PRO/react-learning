# Hooks Fundamentals

This day is the bridge between React components and reusable logic. The focus is not memorizing hooks, but choosing the right hook for the right job.

## Learning order & Folder Structure

The concepts for this day are organized into the following sequential subfolders. Each subfolder contains a dedicated `README.md` with detailed explanations and a **Pros & Cons** section for the respective hook:

1. `01_useState` - Managing local UI state
2. `02_useEffect` - Handling side effects and component lifecycle
3. `03_useContext` - Managing shared state and avoiding prop drilling
4. `04_useRef` - Accessing the DOM and keeping stable mutable values
5. `05_useMemo` - Caching expensive calculations
6. `06_useCallback` - Caching function references
7. `07_useReducer` - Managing complex state objects and transition rules

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