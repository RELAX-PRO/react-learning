# Global States

> **💡 How to Imagine This:**
> Think of global state like a city's public water supply. Instead of every house maintaining its own well or carrying buckets of water back and forth, everyone taps into the same central system whenever they need it.


This day explains how to share state across a React app without passing props through every layer.

## Learning order

1. Context API
2. Prop drilling avoidance
3. Redux Toolkit
4. Zustand store
5. Jotai atoms
6. Recoil states
7. Global data persistence

## What to learn here

- When props become too noisy
- When context is enough
- When a dedicated store is better than local component state
- How to choose between Redux, Zustand, Jotai, and Recoil
- How to persist global state safely

## State Management Pros & Cons Summary

- **Context API**: Great for low-frequency updates (themes), but causes widespread re-renders for fast-changing data.
- **Redux Toolkit**: Highly scalable and predictable, but introduces boilerplate and complexity.
- **Zustand**: Lightweight, simple API without context providers, but less rigid structure.
- **Jotai / Recoil**: Excellent for derived, atomic state and minimizing re-renders, though requires a different mental model (bottom-up instead of top-down).
- **Persistence**: Crucial for UX, but requires care around storage limits and sensitive data.

## Why it matters

Global state is one of the biggest architecture decisions in a React app. Picking the wrong tool too early can make a project harder to maintain than the problem itself.

## Practice checklist

- Remove one level of prop drilling
- Move one shared value into context
- Compare one store-based approach with one context-based approach
