# React Core Concepts: State Management

This day focuses on how components change over time and how React keeps updates predictable.

## Topics in this day

- Event handling
- functional updates
- Immutability patterns
- lifting state up
- state batching
- State initialization
- State updates

## What the student should learn

- How event handlers trigger change
- Why state must be treated as immutable
- How to move state to the right parent component
- Why React may batch multiple updates
- When to use a functional state update

## Why it matters

This is the point where students stop treating state as a random variable and start using it as the source of truth for UI behavior.

## Practice checklist

- Add a click handler that updates state
- Rewrite one update using a functional form
- Move shared state to the nearest common parent
- Update an array without mutation